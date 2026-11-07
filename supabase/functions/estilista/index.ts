// Lombardi Fashion: función "estilista" (versión Gemini, nivel gratuito de Google AI Studio).
// Recibe un pedido de la app (texto y, si hace falta, una foto) y se lo pasa a Gemini.
// La clave vive como secreto en Supabase (GEMINI_API_KEY): nunca llega al teléfono.
// Si un modelo no está disponible o se agotó su cupo gratis, prueba con el siguiente.

const KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const MODELS: Record<string, string[]> = {
  smart: ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-3.1-flash-lite"], // fotos: detectar prendas, colorimetría
  fast: ["gemini-3.1-flash-lite", "gemini-2.5-flash-lite", "gemini-2.5-flash"], // opiniones cortas
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
  if (!KEY) return json({ error: "Falta el secreto GEMINI_API_KEY", code: "no_key" }, 500);

  let body: { prompt?: string; image?: string | null; tier?: string; max_tokens?: number };
  try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }

  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt || prompt.length > 60000) return json({ error: "Pedido vacío o demasiado largo" }, 400);
  if (body.image && (typeof body.image !== "string" || body.image.length > 8_000_000)) {
    return json({ error: "Imagen inválida o demasiado grande" }, 400);
  }

  const parts: unknown[] = [];
  if (body.image) parts.push({ inline_data: { mime_type: "image/jpeg", data: body.image } });
  parts.push({ text: prompt });
  const maxOut = Math.min(Math.max((Number(body.max_tokens) || 1024) * 3, 2048), 8192);

  let lastErr = "Error de la IA", lastStatus = 502;
  for (const model of MODELS[body.tier ?? "fast"] ?? MODELS.fast) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": KEY, "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { maxOutputTokens: maxOut, temperature: 0.4 } }),
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      const text = (data.candidates?.[0]?.content?.parts ?? [])
        .filter((p: { text?: string; thought?: boolean }) => p.text && !p.thought)
        .map((p: { text: string }) => p.text).join("");
      if (text) return json({ text, model });
      lastErr = "La IA no devolvió texto"; lastStatus = 502;
      continue;
    }
    lastErr = data?.error?.message ?? `Error ${r.status}`;
    lastStatus = r.status === 429 ? 429 : 502;
    // 404/400 (modelo no disponible) o 429 (cupo agotado): probamos el siguiente modelo
    if (![400, 403, 404, 429, 500, 503].includes(r.status)) break;
  }
  return json({ error: lastErr, code: lastStatus === 429 ? "rate_limited" : "upstream_error" }, lastStatus);
});
