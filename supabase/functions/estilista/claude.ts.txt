// Lombardi Fashion: función "estilista".
// Recibe un pedido de la app (texto y, si hace falta, una foto) y se lo pasa a Claude.
// La clave de la IA vive como secreto en Supabase (ANTHROPIC_API_KEY): nunca llega al teléfono.
// Solo responde a usuarios logueados (dejá activado "Enforce JWT verification").

const KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const MODELS: Record<string, string> = {
  smart: "claude-sonnet-5-5", // fotos: detectar prendas, colorimetría
  fast: "claude-haiku-5-5",   // opiniones cortas del estilista
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Solo POST" }, 405);
  if (!KEY) return json({ error: "Falta el secreto ANTHROPIC_API_KEY", code: "no_key" }, 500);

  let body: { prompt?: string; image?: string | null; tier?: string; max_tokens?: number };
  try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }

  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt || prompt.length > 60000) return json({ error: "Pedido vacío o demasiado largo" }, 400);
  if (body.image && (typeof body.image !== "string" || body.image.length > 8_000_000)) {
    return json({ error: "Imagen inválida o demasiado grande" }, 400);
  }

  const content: unknown[] = [];
  if (body.image) content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: body.image } });
  content.push({ type: "text", text: prompt });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODELS[body.tier ?? "fast"] ?? MODELS.fast,
      max_tokens: Math.min(Math.max(Number(body.max_tokens) || 1024, 64), 4096),
      messages: [{ role: "user", content }],
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const status = r.status === 429 ? 429 : 502;
    return json({ error: data?.error?.message ?? "Error de la IA", code: r.status === 429 ? "rate_limited" : "upstream_error" }, status);
  }
  const text = (data.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("");
  return json({ text });
});
