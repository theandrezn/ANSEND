# Google OAuth no Supabase

O login com Google da ANSEND usa o projeto Supabase `qxujynzqdursxaehchik`.

## Google Cloud

Crie um OAuth Client do tipo `Web application` e configure:

- Authorized JavaScript origin: `https://ansendmusic.site`
- Authorized redirect URI: `https://qxujynzqdursxaehchik.supabase.co/auth/v1/callback`

Guarde o Client ID e o Client Secret.

## Supabase Dashboard

Em `Authentication > Providers > Google`:

- Habilite o provider Google.
- Cole o Google Client ID.
- Cole o Google Client Secret.
- Salve as alteracoes.

Em `Authentication > URL Configuration`:

- Site URL: `https://ansendmusic.site`
- Redirect URLs:
  - `https://ansendmusic.site`
  - `https://ansendmusic.site/**`
  - `https://ansendmusic.site/auth/callback`

Remova entradas antigas de producao que apontem para dominios de preview, worker ou qualquer origem diferente de `https://ansendmusic.site`.

Se o `Site URL` continuar no dominio antigo, o Supabase pode concluir o OAuth e salvar a sessao em outra origem, deixando `ansendmusic.site` deslogado.

## Nome mostrado pelo Google

Configure o nome do aplicativo como `ANSEND` no Google Cloud em `APIs & Services > OAuth consent screen`.

Mesmo com o nome do app correto, o Google pode mostrar `qxujynzqdursxaehchik.supabase.co` porque o callback OAuth passa pelo dominio padrao do Supabase:

```text
https://qxujynzqdursxaehchik.supabase.co/auth/v1/callback
```

Para remover completamente esse dominio da tela do Google, configure um dominio customizado de Auth no Supabase, por exemplo:

```text
https://auth.ansendmusic.site/auth/v1/callback
```

Depois disso, substitua o Authorized redirect URI no Google Cloud pelo callback do dominio customizado.

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
