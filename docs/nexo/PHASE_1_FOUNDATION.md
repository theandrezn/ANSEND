# ANSEND — NEXO IA — Fase 1: Fundação de Dados, Segurança e Arquitetura

Data da auditoria: 2026-06-25.

## 1. Resumo executivo

O NEXO já possuía chat, diagnóstico, classificação determinística de intenção, ranking, embeddings, histórico, analytics e ações estruturadas. Esta fase preservou essas capacidades e adicionou uma fronteira determinística para dados comerciais.

As recomendações de beats agora partem de `public.beats`, `public.public_profiles` e `public.beat_licenses`. Apenas beats publicados, públicos, não vendidos exclusivamente, ligados a produtor público, com capa, preview e licença ativa com preço/moeda válidos entram no ranking. URLs, preços, licenças e rotas não são aceitos do modelo.

Decisão: **NO-GO PARA FASE 2**. O núcleo local está implementado e testado, mas o histórico remoto de migrations diverge materialmente do repositório. A inspeção SQL detalhada também ficou bloqueada por autenticação do banco. Os contratos REST essenciais foram confirmados por probes anônimos somente leitura.

## 2. Estado do Git

- Diretório: `C:\Users\games\Documents\BEATS - SEGUNDO - ANDRÉ`
- Branch: `main`
- Remote: `https://github.com/theandrezn/ANSEND.git`
- Commit inicial: `47481ac chore(deploy): sync auth layout build metadata`
- Alterações preexistentes preservadas: `AGENTS.md`, `styles.css`, `dist/styles.css` e `dist/index.html`.
- Nenhum commit, push, deploy, reset, rebase, migration ou write remoto foi executado.
- O projeto Supabase vinculado foi confirmado como `qxujynzqdursxaehchik` (`ANSEND`).

## 3. Arquitetura atual do NEXO

### Frontend

`script.js` mantém estado, renderização do chat/assistente, histórico, cards, ações e analytics. `sendNexoChatMessage()` chama o Worker. `executeNexoAssistantActions()` aceita somente ações conhecidas; previews agora resolvem `beatId` com `findBeat()` e reutilizam `playBeat()`.

### Worker

`src/worker.mjs` autentica o usuário, limita requisições, coleta dados via REST, executa o núcleo determinístico e chama OpenAI apenas para conversas/diagnósticos que exigem geração. Consultas do NEXO usam chave publicável + JWT do usuário, não service role.

### OpenAI

- APIs: Responses (`/v1/responses`) e Embeddings (`/v1/embeddings`).
- Chave: somente `env.OPENAI_API_KEY` no Worker.
- Modelos configuráveis: `OPENAI_MODEL`, `NEXO_FALLBACK_MODELS`, `NEXO_INTENT_MODEL`.
- O frontend e o bundle não contêm `OPENAI_API_KEY`.
- Mensagens são limitadas, sanitizadas e submetidas a rate limit por usuário/IP/rota.

### Histórico e dados

Conversas e mensagens usam `nexo_conversations` e `nexo_messages`, com RLS local por usuário. Analytics usa `analytics_events`, `recommendation_interactions`, métricas agregadas e perfis de preferência.

## 4. Mapa das entidades

| Entidade | Fonte de verdade | ID | Status/preço | Mídia | Rota/ação | Problemas |
|---|---|---|---|---|---|---|
| Beat | `public.beats` | `beats.id` | `status`, `is_public`, `sold_exclusively` | `cover_url`, `audio_url` ou YouTube | `BEAT_DETAIL`, `PLAY_BEAT_PREVIEW` | `beats.price` é legado e não autoritativo para recomendação |
| Produtor/perfil | `public.public_profiles` derivada de `profiles` | `profiles.id = beats.user_id` | visibilidade pública | `avatar_url` | `PROFILE_DETAIL` | não há estado público uniforme de bloqueio/atividade no contrato remoto observado |
| Licença | `public.beat_licenses` | `beat_licenses.id` | `price_cents`, `currency`, `is_active` | flags MP3/WAV/Stems | seleção no detalhe/checkout | fallback visual do frontend não é fonte comercial |
| Profissional | `public.public_profiles` | `id` | papel/visibilidade | avatar | `PROFILE_DETAIL` | serviços e disponibilidade não estão normalizados em uma entidade única |
| Serviço/oportunidade | `hiring_posts` e metadados atuais | `id` | orçamento/status | anexos conforme fluxo | `SERVICES`/comunidade | ainda não é um catálogo canônico de serviços |
| Pedido | `orders` + `order_items` | UUID | snapshots imutáveis em centavos | arquivos autorizados | `PURCHASES` | fora do escopo de alteração desta fase |
| Evento | `analytics_events` e estruturas legadas | UUID/idempotency key | nome permitido | n/a | endpoint `/api/analytics/events` | coexistem estruturas de analytics de fases diferentes |

## 5. Fluxo completo do beat

1. `public.beats` guarda identidade, dono, publicação, metadados e preview.
2. O frontend carrega beats e os adapta para o formato visual usado por `marketplaceBeats()`/`findBeat()`.
3. Cards e detalhe navegam por `#beat-<uuid>`.
4. `renderBeatDetail()` resolve o beat e chama `fetchBeatLicenses()`.
5. `public.beat_licenses` fornece licenças reais e preços em centavos.
6. A seleção de licença cria a referência `beat_id + license_id`.
7. O Worker reconsulta beat e licença ativa antes de calcular checkout.
8. O banco cria `orders`/`order_items` com snapshots de licença e preço.
9. Compras concluídas geram entitlement, contrato e autorização de download.

Para o NEXO, `collectNexoRetrievedData()` consulta beats reais, perfis dos donos e licenças ativas. `normalizeSearchableBeat()` produz o contrato; somente `eligibility.recommendable === true` segue ao ranking.

## 6. Licenças e preços

- Fonte única: `beat_licenses.price_cents` + `beat_licenses.currency`.
- Menor preço: menor inteiro válido entre licenças ativas, não-fallback, em moeda permitida.
- Padrão desta fase: BRL e preço maior que zero; preço zero só é aceito quando o chamador habilita explicitamente `allowFree`.
- Licenças customizadas são aceitas quando persistidas e válidas.
- Licenças inativas, nulas, com moeda inválida ou geradas localmente não entram no NEXO.
- `beats.price` permanece como compatibilidade de telas antigas, mas não define preço comercial do NEXO ou do checkout seguro.

## 7. Rotas canônicas

| Ação | Parâmetros | Resultado |
|---|---|---|
| `BEAT_DETAIL` | `beatId` UUID | `#beat-<uuid>` |
| `PROFILE_DETAIL` | `profileId` UUID | `#perfil-<uuid>` |
| `PLAY_BEAT_PREVIEW` | `beatId` UUID | ação interna `play_beat_preview` |
| `MARKETPLACE` | nenhum | `#marketplace` |
| `PROFESSIONALS` | nenhum | `#produtores` |
| `SERVICES` | nenhum | `#servicos` |
| `CART` | nenhum | `#carrinho` |
| `PURCHASES` | nenhum | `#compras` |

IDs inválidos e ações desconhecidas retornam erro. O modelo não fornece hash ou URL executável.

## 8. Áudio e player

`playBeat()` é a ação real de reprodução. Ela passa por `normalizePlayerBeat()`, reutiliza o player global para uploads e o player YouTube existente para fontes incorporadas.

O NEXO não recebeu player próprio. `PLAY_BEAT_PREVIEW` contém somente `beatId`; o frontend resolve o item com `findBeat()` e chama `playBeat(beat)`. Beat ausente falha com mensagem e não tenta reproduzir URL enviada pela IA.

## 9. Elegibilidade

`evaluateBeatEligibility(context)` retorna:

```json
{
  "recommendable": false,
  "reasons": ["missing_preview"]
}
```

Motivos possíveis:

- `deleted_or_missing`
- `not_published`
- `not_visible`
- `sold_exclusively`
- `producer_unavailable`
- `missing_cover`
- `missing_preview`
- `no_active_license`
- `invalid_price`
- `invalid_currency`
- `unauthorized`

## 10. Contratos normalizados

### SearchableBeat

Contém ID, título, descrição, produtor público, capa, preview, origem, gênero, subgênero, moods, tags, BPM, tonalidade, menor preço, tipos de licença, rota, ação de preview e elegibilidade. Não inclui paths privados ou arquivos de entrega.

### SearchableProfessional

Contém ID público, nome, username, papel, avatar, bio, estilos e ação `PROFILE_DETAIL`. Não pressupõe preço ou disponibilidade inexistente.

### SearchableService

Contrato inicial com ID, título, descrição, categoria, preço normalizado quando confiável, profissional associado, status, visibilidade e ação `SERVICES`. A busca de serviços não foi implementada.

## 11. Segurança

| Severidade | Problema/evidência | Impacto | Correção/status |
|---|---|---|---|
| High | Migrations locais e remotas divergem em várias versões | produção não é reproduzível com segurança pelo repositório | bloqueado; reconciliar antes da Fase 2 |
| High | NEXO usava helper que preferia service role para leituras | bypass potencial de RLS | corrigido: chave publicável + JWT do usuário |
| High | `public_catalog_items` era consultada, mas retorna REST 404 | recomendações podiam falhar silenciosamente | corrigido com `beats` + perfis + licenças |
| Medium | Fallbacks de licença ainda existem no detalhe do frontend | apresentação pode divergir do catálogo persistido | excluídos do NEXO e checkout real; remoção global fora do escopo |
| Medium | Rate limit usa memória do isolate | não é limite global forte | manter como defesa básica; planejar armazenamento distribuído se necessário |
| Medium | Inspeção SQL remota falhou por autenticação | policies/RPCs remotos não foram comparados integralmente | bloqueio documentado; não foi solicitado ou exposto segredo |
| Informational | OpenAI apenas no Worker; testes impedem chave no frontend | separação correta | mantido |
| Informational | Respostas e erros usam `no-store`, limites e sanitização | reduz vazamento e abuso | mantido |

Probes REST read-only:

- `beats`: 200; contrato de colunas válido.
- `public_profiles`: 200; contrato de colunas válido.
- `beat_licenses`: 200; contrato de colunas válido.
- `public_catalog_items`: 404.

## 12. Alterações realizadas

- `src/nexo/nexo-catalog-foundation.mjs`: preço, elegibilidade e contratos normalizados.
- `src/nexo/nexo-v2-core.mjs`: ações `SERVICES` e `PLAY_BEAT_PREVIEW`.
- `src/worker.mjs`: consultas reais, join determinístico e leituras sob JWT/RLS.
- `script.js`: execução segura da ação de preview reutilizando o player real.
- `tests/nexo-foundation-check.mjs`: cobertura da fundação e regressões de integração.
- `package.json`: inclusão do novo teste em `test:nexo`.
- `docs/nexo/PHASE_1_FOUNDATION.md`: este relatório.
- `dist/`: regenerado pelo build oficial ao final da validação.

## 13. Testes executados

Resultados finais:

- `npm run test:nexo`: passou.
- `npm run test:recommendations`: passou.
- `npm run test:data-boundaries`: passou.
- `npm run test:routes`: passou; smoke Playwright de 12 rotas, incluindo NEXO e rotas dinâmicas de beat/perfil.
- `npm run test:player-controls`: passou.
- `npm run test:release-licenses`: passou.
- `npm run build`: passou; `dist/script.js` e `dist/styles.css` ficaram em paridade com as fontes.
- Scan do bundle estático: nenhum padrão de chave OpenAI, service role ou chave com prefixo `sk-`.

## 14. Migrations necessárias

Nenhuma migration nova foi criada ou aplicada.

Antes da Fase 2 é necessária uma atividade separada de reconciliação:

- comparar versões locais-only e remote-only;
- recuperar o conteúdo oficial das migrations remotas;
- verificar equivalência com `supabase/schema.sql`;
- nunca marcar versões como reparadas sem comprovar o DDL correspondente;
- validar RLS/RPCs após a reconciliação.

## 15. Variáveis de ambiente

Somente nomes:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `NEXO_FALLBACK_MODELS`
- `NEXO_INTENT_MODEL`
- `NEXO_MAX_OUTPUT_TOKENS`
- `NEXO_CHAT_MAX_OUTPUT_TOKENS`
- `NEXO_REASONING_EFFORT`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANSEND_DEBUG_ERRORS`

## 16. Débitos técnicos

### Bloqueante para Fase 2

- Reconciliar histórico de migrations local/remoto.
- Confirmar remotamente RLS, grants e funções do NEXO por inspeção SQL autenticada.

### Importante

- Remover ou rotular explicitamente fallbacks de licença restantes no detalhe.
- Consolidar estruturas legadas de analytics/recomendação.
- Definir estado público canônico de conta ativa/bloqueada do produtor.

### Pode esperar

- Rate limit distribuído.
- Contrato completo de serviços.
- Redução adicional do acoplamento de `script.js`.

### Fora do escopo

- Busca vetorial nova, novo ranking, redesign, checkout, pagamentos e deploy.

## 17. Plano recomendado para a Fase 2

Somente após resolver os bloqueios:

1. Criar RPC ou endpoint read-only de busca de beats que retorne o contrato normalizado.
2. Aplicar filtros estruturados de gênero, mood, BPM, preço e formato.
3. Fazer ranking operar apenas sobre resultados elegíveis.
4. Persistir impressão e interação com idempotência.
5. Manter ações estruturadas para abrir, tocar, salvar e comparar.
6. Adicionar testes de autorização, precisão dos filtros, zero-resultados e não-invenção.
7. Não permitir SQL, URLs ou permissões decididas pelo modelo.

## 18. Decisão final

```text
NO-GO PARA FASE 2
```

Justificativa: a fundação determinística local e os contratos REST essenciais estão presentes, mas o histórico de migrations remoto não corresponde ao repositório e as policies/RPCs remotas não puderam ser auditadas integralmente. Avançar antes da reconciliação criaria risco de implementar a busca sobre um banco cuja evolução não é reproduzível nem completamente verificável.
