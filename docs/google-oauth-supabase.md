# Google OAuth no Supabase

O login com Google da ANSEND usa o projeto Supabase `qxujynzqdursxaehchik`.

## Google Cloud

Crie um OAuth Client do tipo `Web application` e configure:

- Authorized JavaScript origin: `https://ansend.andrrluis86.workers.dev`
- Authorized redirect URI: `https://qxujynzqdursxaehchik.supabase.co/auth/v1/callback`

Guarde o Client ID e o Client Secret.

## Supabase Dashboard

Em `Authentication > Providers > Google`:

- Habilite o provider Google.
- Cole o Google Client ID.
- Cole o Google Client Secret.
- Salve as alteracoes.

Em `Authentication > URL Configuration`:

- Site URL: `https://ansend.andrrluis86.workers.dev`
- Redirect URLs:
  - `https://ansend.andrrluis86.workers.dev`
  - `https://ansend.andrrluis86.workers.dev/**`

## CLI

O repo tambem possui `supabase/config.toml` preparado para `supabase config push`.
Antes de aplicar via CLI, exporte:

```bash
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID="..."
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET="..."
```

Depois execute:

```bash
supabase config push --project-ref qxujynzqdursxaehchik
```

Sem essas credenciais, o Supabase retorna:

```json
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}
```
