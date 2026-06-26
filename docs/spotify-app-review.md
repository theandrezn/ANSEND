# Spotify App Review Checklist

## Dashboard Spotify
- App criado no Spotify Developer Dashboard.
- Dominio de producao configurado.
- Redirect URI exato: `https://ansendmusic.site/api/spotify/callback`.
- Redirect local opcional: `http://127.0.0.1:8787/api/spotify/callback`.
- Usuarios de teste adicionados enquanto o app estiver em Development Mode.

## Scopes e Uso
- `playlist-read-private`: listar playlists privadas controladas pelo usuario.
- `playlist-read-collaborative`: identificar playlists colaborativas.
- `user-read-private`: confirmar a conta conectada.
- `playlist-modify-public`: adicionar faixas aprovadas a playlists publicas verificadas.
- `playlist-modify-private`: adicionar faixas aprovadas a playlists privadas verificadas.
- A ANSEND nao envia arquivos de audio ao Spotify; usa somente Spotify Track URIs.
- A ANSEND nao promete placement, streams, ouvintes ou inclusao paga.

## Privacidade
- Tokens ficam criptografados no backend.
- Tokens nao aparecem no frontend, Network, logs ou screenshots.
- Ao desconectar, tokens sao apagados e os dados editoriais cadastrados sao preservados.
- No fluxo de exclusao de conta, tokens e states OAuth devem ser removidos.

## Evidencias Para Producao
- Screenshot do estado desconectado.
- Screenshot do consentimento Spotify mostrando scopes.
- Screenshot do estado conectado.
- Screenshot do campo de link de playlist e preview verificado.
- Screenshot de uma tentativa de URI invalida bloqueada.
- Screenshot da desconexao.
- Politica de privacidade e termos atualizados com os dados armazenados.

## Limitacoes Development Mode
Enquanto o app estiver em Development Mode, nao anunciar a integracao como aberta para todos. Mantenha lista de usuarios autorizados e prepare Extended Quota somente depois dos testes reais.
