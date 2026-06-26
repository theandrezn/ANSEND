# Spotify Integration

## Variaveis
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REDIRECT_URI`
- `SPOTIFY_TOKEN_ENCRYPTION_KEY`

Configure estes valores como Worker secrets ou variaveis seguras do ambiente. Nao coloque valores reais no Git, no frontend, em screenshots ou em logs.

## Redirect URIs
- Producao: `https://ansendmusic.site/api/spotify/callback`
- Local: `http://127.0.0.1:8787/api/spotify/callback`

Use o valor exato cadastrado no Spotify Developer Dashboard. Nao use wildcard e nao use `localhost` como redirect recomendado.

## Scopes
A integracao solicita somente:
- `user-read-private`
- `playlist-read-private`
- `playlist-read-collaborative`
- `playlist-modify-public`
- `playlist-modify-private`

A ANSEND usa os scopes de escrita apenas para adicionar Spotify Track URIs aprovadas a playlists verificadas. A integracao nao envia MP3, WAV ou audio da ANSEND ao Spotify.

## Fluxo OAuth
1. O frontend autenticado chama `/api/spotify/connect`.
2. O Worker valida a sessao ANSEND, gera `state` aleatorio e salva apenas o hash de uso unico ligado ao `user_id`.
3. O Spotify redireciona para `/api/spotify/callback`.
4. O Worker valida `state`, troca `code` por tokens, busca `/v1/me`, criptografa tokens com AES-GCM e salva dados seguros da conexao.
5. O frontend consulta `/api/spotify/status`; tokens nunca sao retornados.
6. O curador cola um link `https://open.spotify.com/playlist/{id}` em `/api/spotify/resolve-link`; o Worker confirma dono/colaborador antes de salvar.
7. Para adicionar musicas aprovadas, o Worker chama `POST /v1/playlists/{playlist_id}/items` usando apenas Spotify Track URIs validas.

## Persistencia
- `spotify_connections`: dados seguros da conta e status.
- `spotify_connection_secrets`: tokens criptografados, sem acesso direto do cliente.
- `spotify_oauth_states`: states temporarios de uso unico.
- `curator_playlist_snapshots`: snapshots operacionais por playlist.
- `spotify_sync_runs`: execucoes de sincronizacao.
- `curator_spotify_playlists`: playlists oficiais verificadas por conta Spotify.
- `spotify_playlist_placements`: registro de faixas adicionadas, snapshot e erro operacional.

## Erros e Reconexao
Quando o refresh retorna `invalid_grant`, os tokens locais sao apagados e a conexao passa a exigir reconexao. Playlists e dados editoriais permanecem preservados, mas escrita/sync ficam suspensos ate reconexao.

## Teste Local
1. Configure secrets locais no Wrangler.
2. Use `http://127.0.0.1:8787/api/spotify/callback` no app Spotify.
3. Rode `npm run build`.
4. Rode `wrangler dev`.
5. Acesse `#curadoria`, conecte uma conta autorizada no Development Mode e confirme que nenhum token aparece no Network ou console.
