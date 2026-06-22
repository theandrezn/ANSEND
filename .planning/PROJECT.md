# ANSEND - Área Premium de Pedidos e Compras

## What This Is

ANSEND é uma plataforma musical existente que conecta compradores, artistas e produtores por meio de catálogo de beats, licenças, carrinho, checkout, pagamentos, perfis e chat. Este marco transforma a rota existente `#compras` em uma área de membros premium e confiável, na qual cada comprador consulta seus pedidos reais, licenças imutáveis, produtores, pagamentos, contratos e downloads autorizados.

O trabalho evolui a implementação atual. Não cria uma aplicação, rota ou arquitetura de comércio paralela.

## Core Value

Depois de uma compra confirmada, somente o comprador correto consegue reencontrar e acessar exatamente o beat, a licença, o contrato e os arquivos que adquiriu.

## Requirements

### Validated

- ✓ Autenticação e sessão de usuário via Supabase Auth — existente
- ✓ Perfis privados e públicos de produtores com rota pública — existente
- ✓ Catálogo de beats com licenças selecionáveis e venda exclusiva — existente
- ✓ Carrinho e compra direta preservam a combinação beat + licença — existente
- ✓ Checkout server-side com Mercado Pago, preço validado e tentativas persistidas — existente
- ✓ Webhook assinado e reconciliação de pagamento com idempotência — existente
- ✓ Tabelas `orders`, `order_items`, `payment_attempts`, `beat_licenses` e ledger — existente
- ✓ Rota protegida `#compras` com listagem e detalhe no mesmo renderer — existente
- ✓ Perfil e conversa direta reutilizáveis a partir de um produtor real — existente
- ✓ Endpoint autenticado de download com URL assinada temporária — existente

### Active

- [ ] Auditar e documentar o fluxo atual completo de compra, pedido, pagamento, licença, entitlement, contrato e download.
- [ ] Corrigir o ciclo de criação e revogação de direitos para que pedidos pagos gerem entitlements e documentos uma única vez.
- [ ] Preservar um snapshot imutável e suficiente de cada item comprado, independente de alterações futuras no beat ou licença.
- [ ] Garantir no backend que somente o comprador acesse o pedido e que apenas direitos ativos autorizem downloads.
- [ ] Converter a listagem existente em uma experiência premium baseada somente em dados reais e pagináveis.
- [ ] Converter o detalhe existente em uma visão confiável do beat, licença, pagamento, produtor, contrato e arquivos adquiridos.
- [ ] Reutilizar as rotas reais de perfil e chat sem simulações.
- [ ] Tratar corretamente estados pendente, em processamento, pago, falho, cancelado, expirado e reembolsado.
- [ ] Remover `localStorage`, mocks e fallbacks gerados no navegador como fontes finais de pedidos e contratos autenticados.
- [ ] Validar segurança, responsividade, acessibilidade, regressões e build antes de qualquer entrega.

### Out of Scope

- Nova página ou rota de pedidos — `#compras` é a superfície canônica.
- Substituição do Supabase Auth, Mercado Pago, carrinho ou checkout — o marco integra e endurece o fluxo atual.
- Redesign do carrinho, checkout ou identidade visual global — o escopo visual é local à área de compras.
- Aplicativo separado, reescrita total ou migração de framework — incompatível com a arquitetura atual e o risco do marco.
- Pedidos, pagamentos, produtores ou arquivos simulados — o resultado final deve usar dados reais.
- URLs permanentes para arquivos privados — downloads devem continuar autorizados no backend.
- Novos status inventados — a interface deve mapear o modelo real.
- Implementação automática de todas as fases — cada fase exige planejamento e o marco para após a apresentação deste roadmap.

## Context

### Estado auditado em 2026-06-22

- A rota canônica é `#compras`, protegida por autenticação em `protectedRoute()` e renderizada por `renderPurchases()` em `script.js`.
- O mesmo renderer contém listagem e detalhe via query no hash (`id`, `item_id` ou `attempt_id`); não há segunda página.
- A listagem consulta `orders` + `order_items` do comprador e `payment_attempts` ainda sem `order_id`; beats e perfis são resolvidos em consultas adicionais.
- A interface já possui busca, ordenação, filtros por status e “carregar mais”, mas a paginação ocorre após carregar toda a coleção.
- `appState.purchases` ainda nasce de `ansend-purchases` no `localStorage`; a tela oferece “Limpar dados locais”, apesar de os pedidos reais virem do banco.
- O detalhe já liga para `#perfil-{username}` e chama `openOrCreateDirectConversation(producerId)`.
- O frontend gera contrato textual como fallback quando `license_documents` não retorna documento; isso não pode ser fonte jurídica final.
- `order_items` já preserva nome, termos, preço, royalties, arquivos e versão/aceite da licença, mas o snapshot ainda precisa ser auditado contra todos os direitos e dados contratuais exigidos.
- `payment_attempts` possui chaves únicas de idempotência, referência externa, fingerprint do carrinho, status real e vínculo posterior com `orders`.
- `orders` possui unicidade por provedor + ID de pagamento e RLS para o comprador.
- `purchase_entitlements`, `license_documents` e `download_logs` já existem com RLS.
- `/api/orders/download` valida sessão, entitlement ativo, formato permitido, caminho do beat e gera URL assinada de 5 minutos.
- O trigger `manage_purchase_entitlements_trigger` contém uma falha de ordem: o pedido nasce `completed` antes dos itens; quando o trigger roda não encontra `order_items`, e a atualização posterior permanece `completed → completed`, não satisfazendo a condição de criação.
- Reembolso revoga entitlement somente quando `orders.status` transita de `completed` para `refunded`; a reconciliação completa desse estado ainda precisa ser confirmada.
- O workspace está limpo; a única divergência é o commit documental do mapa ainda não enviado (`main` um commit à frente de `origin/main`).

### Riscos principais

- Liberação ausente ou inconsistente de entitlements/documentos devido à ordem do trigger.
- Dependência de dados atuais de beat/perfil para exibir uma compra histórica, comprometendo snapshots.
- Contrato fallback gerado no navegador com valores padrão, potencialmente divergente do adquirido.
- Carregamento integral e N+1 de beats/perfis antes da paginação visual.
- Detalhe identificado por UUID interno no hash; RLS impede leitura cruzada, mas um identificador público opaco pode melhorar a superfície sem substituir a autorização.
- Downloads selecionam entitlement por comprador + beat, não por pedido/item específico; múltiplas compras/licenças do mesmo beat exigem regra determinística.
- `profiles` é consultada diretamente onde `public_profiles` pode ser a projeção apropriada.
- UI e estilos da área estão embutidos em `script.js`, elevando risco de regressão no monólito.

## Constraints

- **Arquitetura**: Preservar SPA, `script.js`, Worker Cloudflare, Supabase e `#compras` — evitar sistemas paralelos.
- **Fonte de verdade**: Supabase e backend real — `localStorage` não representa pedidos autenticados.
- **Segurança**: RLS permanece ativa; secrets e validações sensíveis ficam fora do frontend.
- **Pagamentos**: Mercado Pago, checkout e webhook atuais são preservados — correções devem reforçar reconciliação e idempotência.
- **Compatibilidade**: Carrinho, checkout, autenticação, perfil, chat, player e catálogo não podem regredir.
- **Mudanças**: Revalidar `git status`, diff e arquivos imediatamente antes de cada edição; nunca sobrescrever trabalho alheio.
- **Design**: Escuro, premium, neutro e responsivo; laranja apenas como destaque pontual, sem alterar componentes globais por necessidade local.
- **Entrega**: Produzir planejamento completo e parar para revisão antes de implementar código funcional.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Manter `#compras` como rota canônica | Evita duplicação e preserva navegação existente | — Pending |
| Reutilizar tabelas de pedidos, pagamentos e entitlements | A maior parte do modelo já existe; a menor correção segura é preferível | — Pending |
| Autorizar pedidos e downloads no backend | IDs e condições no frontend não constituem segurança | — Pending |
| Tratar snapshot como dado histórico imutável | Edições futuras de licença/beat não podem alterar uma compra paga | — Pending |
| Usar chat e perfil reais do produtor | Evita experiências simuladas e componentes duplicados | — Pending |
| Organizar o marco em sete fases sequenciais | A segurança e o modelo precisam estabilizar antes da UI e dos downloads | — Pending |
| Tornar a Fase 2 um gate bloqueador | Nenhuma interface é funcional se um pedido pago puder existir sem itens, entitlement ou contrato | — Pending |
| Parar após os artefatos de planejamento | O usuário solicitou revisão explícita antes de implementação | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-22 after project initialization and purchase-flow audit*
