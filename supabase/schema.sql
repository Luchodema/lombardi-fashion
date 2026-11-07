-- Lombardi Fashion: base de datos y fotos.
-- Pegá todo esto en Supabase → SQL Editor → New query → Run. Se puede correr más de una vez.

-- Perfiles, preferencias y conjuntos guardados (una fila por perfil + una "global")
create table if not exists public.estado (
  user_id uuid not null references auth.users(id) on delete cascade,
  clave text not null,
  datos jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, clave)
);

-- Prendas del armario (los datos van en "datos"; la foto, en el storage)
create table if not exists public.prendas (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  perfil text not null,
  datos jsonb not null default '{}'::jsonb,
  foto_path text,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- Seguridad: cada cuenta ve y toca solo lo suyo
alter table public.estado enable row level security;
alter table public.prendas enable row level security;

drop policy if exists "estado propio" on public.estado;
create policy "estado propio" on public.estado
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "prendas propias" on public.prendas;
create policy "prendas propias" on public.prendas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Fotos: carpeta privada, cada cuenta solo accede a su carpeta (<user_id>/...)
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', false)
on conflict (id) do nothing;

drop policy if exists "fotos propias leer" on storage.objects;
create policy "fotos propias leer" on storage.objects
  for select using (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "fotos propias subir" on storage.objects;
create policy "fotos propias subir" on storage.objects
  for insert with check (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "fotos propias cambiar" on storage.objects;
create policy "fotos propias cambiar" on storage.objects
  for update using (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "fotos propias borrar" on storage.objects;
create policy "fotos propias borrar" on storage.objects
  for delete using (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);
