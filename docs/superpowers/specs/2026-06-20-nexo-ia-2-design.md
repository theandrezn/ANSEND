# NEXO IA 2.0 — Design

## Decisão

A NEXO passa de chat de texto livre para orquestrador híbrido. O Cloudflare Worker classifica a intenção, recupera entidades reais do Supabase, ranqueia deterministicamente e devolve um contrato limitado; a SPA apenas renderiza cards e executa ações registradas.

## Fluxo

1. Contexto autenticado, rota, perfil e até 12 mensagens curtas.
2. Classificação controlada em `src/nexo/nexo-v2-core.mjs`.
3. Retrieval server-side nas views públicas existentes.
4. Ranking com relevância, personalização, qualidade, tendência, engajamento, conversão, frescor e popularidade limitada a 3%.
5. Diversidade máxima de dois itens por criador.
6. Resposta normalizada: resposta até 280 caracteres, até 3 cards, razão até 90 caracteres e até 3 chips.
7. Ações resolvidas por chaves conhecidas; IDs de detalhes exigem UUID.
8. Analytics em lote com chave de idempotência.

## Histórico efêmero

`reset_expired_nexo_history()` apaga as conversas do usuário quando `greatest(updated_at, last_accessed_at)` ultrapassa seis horas e atualiza o acesso quando a conversa continua válida. A SPA chama a RPC antes de carregar mensagens e também possui uma guarda local de seis horas.

## Segurança

Auth é validada no Worker; service role não chega ao cliente. Entidades recuperadas são tratadas como dados não confiáveis e nunca controlam prompt ou URL. Tabelas novas usam RLS, eventos aceitam somente nomes controlados e ações validam chave/parâmetros.

## Interface

Mensagens continuam na janela flutuante, mas respostas estruturadas ganham cards compactos, badges sustentados por score, CTA primário/secundário, skeleton existente e input fixo. Re-render não duplica impressões.

## Verificação

Testes cobrem intenção, filtros, limite do contrato, ranking anti-popularidade, diversidade, rotas inválidas, TTL, presença dos endpoints, migration, cards e eventos.
