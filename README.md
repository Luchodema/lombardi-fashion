# Lombardi Fashion

Estilista personal con IA: armario digital por fotos, conjuntos según el clima real y la ocasión, armador con silueta, consulta en tienda y qué comprar.

App web instalable (PWA): un solo link para Android (Chrome → "Instalar app") y iPhone (Safari → Compartir → "Agregar a pantalla de inicio").

## Cómo está armada

| Parte | Qué usa | Costo |
| --- | --- | --- |
| App | HTML + JS, publicada con GitHub Pages | gratis |
| Cuenta, ropa y fotos | Supabase (login, tablas `estado` y `prendas`, carpeta privada `fotos`) | gratis en el plan inicial |
| IA | Función `estilista` en Supabase que llama a Claude con la clave guardada como secreto | se paga por uso en console.anthropic.com |
| Clima | Open-Meteo, pronóstico por hora, sin clave | gratis |

Sin `js/config.js` completo, la app funciona en **modo local**: guarda solo en ese teléfono y sin IA.

## Puesta en marcha (una sola vez)

1. **Supabase → SQL Editor:** pegar `supabase/schema.sql` y tocar Run.
2. **Supabase → Edge Functions → Deploy a new function → Via Editor:** nombre `estilista`, pegar `supabase/functions/estilista/index.ts`, dejar activado "Enforce JWT verification", Deploy.
3. **Supabase → Edge Functions → Secrets:** agregar `ANTHROPIC_API_KEY` con la clave de console.anthropic.com.
4. **Supabase → Authentication → Sign In / Providers → Email:** desactivar "Confirm email" (así la cuenta queda lista al crearla).
5. **`js/config.js`:** completar `supabaseUrl` y `supabaseAnonKey` (Project Settings → API).
6. **GitHub → Settings → Pages:** Source "Deploy from a branch", rama `main`, carpeta `/ (root)`. El link queda en `https://luchodema.github.io/lombardi-fashion/`.
7. **Supabase → Authentication → URL Configuration:** Site URL = ese link.
8. Abrir el link, tocar "Es la primera vez: crear la cuenta" y crear **una** cuenta de la casa. Entrar con la misma en los dos teléfonos.
9. Después de crearla, en **Authentication → Sign In / Providers**, desactivar "Allow new users to sign up" para que nadie más pueda registrarse.

## Tendencias

Están en `TENDENCIAS` dentro de `js/app.js` (hoy: otoño-invierno 2026/27). Se renuevan cada temporada; la próxima, primavera-verano 2027, desde marzo.
