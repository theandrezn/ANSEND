# Roadmap: ANSEND - Área Premium de Pedidos e Compras

## Overview

O marco evolui a rota real `#compras` por dependência: primeiro consolida a auditoria; depois corrige modelo, snapshots e autorização; só então substitui a experiência de listagem e detalhe; em seguida estabiliza downloads/contratos e todo o ciclo de pagamento; por último prova segurança, integração, responsividade e ausência de regressões. Nenhuma fase cria uma segunda área de pedidos ou substitui o checkout atual.

## Audit Baseline

- **Rota:** `#compras`, protegida em `protectedRoute()` e despachada por `renderRoute()`.
- **UI atual:** `renderPurchases()` contém listagem e detalhe por query no hash, estilos inline, filtros, busca, ordenação, “carregar mais”, perfil e chat.
- **Dados atuais:** `orders`, `order_items`, `payment_attempts`, `beat_licenses`, `purchase_entitlements`, `license_documents`, `download_logs`, `seller_ledger_entries`, `beats`, `profiles`/`public_profiles`.
- **Pagamento:** Mercado Pago via `src/worker.mjs`, tentativa idempotente, webhook HMAC, reconciliação e `finalize_checkout_payment()`.
- **Downloads:** `/api/orders/download` autentica, verifica entitlement/formato/caminho e assina URL por 300 segundos.
- **Falha crítica:** o trigger de entitlement executa no `orders` antes da inserção de `order_items`; a transição posterior não recria direitos porque o status permanece `completed`.
- **Dívida local:** `appState.purchases` ainda usa `localStorage`; contrato pode ser gerado no navegador com defaults; paginação é apenas `slice()` após carregar tudo.
- **Git:** workspace sem diff funcional ou arquivos não rastreados no início do planejamento; `main` está à frente de `origin/main` apenas pelos commits de planejamento.

## Phases

- [x] **Phase 1: Auditoria da Implementação Atual** - Consolidar o contrato real do fluxo e a matriz de reutilização sem alterar comportamento. (completed 2026-06-22)
- [ ] **Phase 2: Modelo, Snapshot e Segurança (Bloqueador)** - Corrigir prioritariamente o ciclo transacional, direitos, snapshots, RLS e preservação de dados antes de qualquer UI ser considerada funcional.
- [ ] **Phase 3: Listagem Real e Premium** - Tornar `#compras` uma listagem real, paginável, resiliente e responsiva.
- [ ] **Phase 4: Detalhes, Perfil e Chat** - Exibir cada item comprado e integrar produtor/perfil/chat reais.
- [ ] **Phase 5: Downloads e Contratos Protegidos** - Autorizar arquivos e documentos persistidos segundo o direito adquirido.
- [ ] **Phase 6: Pagamentos e Estados Especiais** - Fechar idempotência, reconciliação, falhas, reembolso e exclusividade.
- [ ] **Phase 7: Testes, Regressões e Acabamento** - Provar segurança, fluxo completo, build e qualidade visual.

## Phase Details

### Phase 1: Auditoria da Implementação Atual
**Goal**: Produzir uma especificação auditada do comportamento existente e da menor mudança segura antes de editar código funcional.
**Depends on**: Nothing (first phase)
**Requirements**: AUD-01, AUD-02, AUD-03, AUD-04
**UI hint**: no
**Success Criteria**:
1. A rota, renderers, handlers, estilos e componentes compartilhados de `#compras` estão documentados com caminhos reais.
2. O fluxo beat/licença → checkout → pagamento → pedido → entitlement → contrato → download pode ser rastreado ponta a ponta.
3. Tabelas, RLS, funções, triggers, índices, endpoints e queries estão representados com lacunas e riscos explícitos.
4. Cada elemento atual está marcado como preservar, reutilizar, corrigir ou remover, incluindo `localStorage` e fallbacks.
5. Git status/diff e conflitos potenciais são revalidados antes de qualquer plano de implementação.
**Plans**: 2 plans

Plans:
- [x] 01-01: Consolidar auditoria frontend, navegação e componentes compartilhados.
- [x] 01-02: Consolidar auditoria backend, banco, pagamentos, segurança e matriz de mudança.

### Phase 2: Modelo, Snapshot e Segurança (Prioridade Máxima)
**Goal**: Eliminar primeiro o risco de pedido pago sem itens, entitlement, contrato ou arquivos liberados, garantindo uma única representação histórica, íntegra e autorizada do direito adquirido.
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, SEC-01, SEC-02, SEC-03, SEC-04, PAY-02, PAY-06
**UI hint**: no
**Success Criteria**:
1. `manage_purchase_entitlements_trigger`, `manage_purchase_entitlements()`, `process_checkout()`, `finalize_checkout_payment()` e os handlers do Worker têm responsabilidade e ordem transacional documentadas e testadas.
2. Pagamento aprovado cria pedido, todos os `order_items`, entitlements, documentos e ledger exatamente uma vez; nenhum direito depende de `completed → completed`.
3. Falha ou concorrência durante criação de itens/direitos produz rollback/falha atômica, nunca pedido concluído parcial.
4. Replay de webhook/status/checkout retorna o mesmo pedido e não duplica direitos, contratos, ledger ou venda exclusiva.
5. Pedidos antigos pagos sem entitlement/contrato recebem backfill idempotente auditado, enquanto RLS preserva isolamento e acesso mínimo.
**Plans**: 7 plans

Plans:
- [x] 02-01: Inspecionar schema e dados reais, produzir diagnóstico somente leitura e aprovar rollout/rollback.
- [x] 02-02: Criar constraints e índices de idempotência com tratamento seguro para legado.
- [x] 02-03: Corrigir a ordem transacional e substituir o trigger prematuro por provisionamento explícito e atômico.
- [x] 02-04: Persistir snapshot imutável e completo da compra, contrato e direitos adquiridos.
- [x] 02-05: Endurecer RLS, grants, privacidade e autorização server-side de downloads.
- [x] 02-06: Implementar backfill idempotente com dry-run, auditoria e bloqueio de casos ambíguos.
- [x] 02-07: Executar testes integrados, regressões, build e gate final de aprovação da Fase 2.

**Blocking Gate for Phases 3-7:**
- Nenhuma listagem, detalhe ou ação de download pode ser declarada funcional enquanto um pedido pago puder ficar sem `order_items`, entitlement ativo e contrato persistido.
- A Fase 3 só pode iniciar após testes automatizados provarem atomicidade, idempotência, backfill seguro e independência de `completed → completed`.
- Rota `#compras`, renderer atual, RLS, downloads assinados e componentes funcionais são preservados; correções devem ocorrer nas responsabilidades existentes.

### Phase 3: Listagem Real e Premium
**Goal**: Entregar na rota existente uma listagem rápida e premium baseada exclusivamente em pedidos/tentativas reais do comprador.
**Depends on**: Phase 2
**Requirements**: LIST-01, LIST-02, LIST-03, LIST-04, LIST-05, LIST-06, LIST-07
**UI hint**: yes
**Success Criteria**:
1. O comprador vê somente seus pedidos/tentativas reais com beat, produtor, licença, data, valor, moeda e status corretos; `localStorage` guarda no máximo preferências temporárias da UI.
2. Filtros, pesquisa e ordenação usam o conjunto real e preservam estados do backend.
3. Paginação/carregamento incremental ocorre na consulta real ao Supabase/backend, antes da resposta, e não após carregar toda a coleção no frontend.
4. Skeleton, vazio, erro recuperável e lista extensa funcionam em desktop e mobile.
5. A página usa superfícies neutras e hierarquia clara, sem bordas/faixas laranja excessivas ou mudanças globais.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Definir query/DTO paginado e remover fonte autenticada de `localStorage`.
- [ ] 03-02: Reestruturar estados, filtros, busca, ordenação e carregamento incremental em `#compras`.
- [ ] 03-03: Aplicar contrato visual premium local, responsividade e acessibilidade.

### Phase 4: Detalhes, Perfil e Chat
**Goal**: Permitir que cada compra/item seja compreendida e acionada com dados históricos e integrações reais.
**Depends on**: Phase 3
**Requirements**: DETL-01, DETL-02, DETL-03, DETL-04, DETL-05, DETL-06
**UI hint**: yes
**Success Criteria**:
1. O detalhe abre dentro de `#compras` e apresenta o item escolhido sem criar rota/página paralela.
2. Pedido com um ou vários itens mostra beat, snapshot de licença, pagamento, valor, moeda, gateway, data e status corretos.
3. Nome/avatar/fallback do produtor vêm do perfil real e o link abre a rota pública existente.
4. A ação de conversa abre ou reutiliza a conversa direta real com o produtor correto.
5. Pedido inexistente, alheio ou com erro produz resposta indistinguível/segura e recuperável sem vazar IDs internos.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Implementar consulta e apresentação segura de pedido/item, incluindo múltiplos itens.
- [ ] 04-02: Integrar perfil público e conversa direta existentes com estados/fallbacks reais.

### Phase 5: Downloads e Contratos Protegidos
**Goal**: Tornar arquivos e documentos reaproveitáveis após login/refresh, liberados somente pelo entitlement histórico correto.
**Depends on**: Phase 4
**Requirements**: FILE-01, FILE-02, FILE-03, FILE-04, FILE-05, FILE-06, FILE-07, FILE-08
**UI hint**: yes
**Success Criteria**:
1. Somente pedido pago com entitlement ativo libera exatamente MP3/WAV/stems previstos no snapshot do item.
2. O backend valida comprador, pedido, item, entitlement, formato, status e caminho antes de assinar uma URL curta.
3. Contrato persistido e autorizado corresponde ao snapshot real e continua acessível após refresh, novo login e outro dispositivo; o fallback apenas no navegador é removido ou formalmente justificado com equivalência técnica.
4. Reembolso/revogação, arquivo ausente e caminho inválido bloqueiam o download com mensagem segura e recuperável.
5. Tentativas relevantes são registradas sem expor secrets ou URLs privadas permanentes.
**Plans**: 3 plans

Plans:
- [ ] 05-01: Tornar autorização de download específica por pedido/item/licença e revisar paths/buckets.
- [ ] 05-02: Persistir/apresentar contratos reais e remover geração jurídica fallback no navegador.
- [ ] 05-03: Implementar logs, limites, erros seguros e testes de reentrada/refresh/revogação.

### Phase 6: Pagamentos e Estados Especiais
**Goal**: Garantir que todos os caminhos do Mercado Pago mantenham um único pedido e direitos coerentes com o estado real.
**Depends on**: Phase 5
**Requirements**: PAY-01, PAY-03, PAY-04, PAY-05, PAY-07
**UI hint**: no
**Success Criteria**:
1. Servidor valida beat, licença, disponibilidade, preço, moeda, fingerprint e valor do provedor antes da conclusão.
2. A idempotência estrutural comprovada na Fase 2 é preservada em todos os mapeamentos e reconciliações de status.
3. Pendência, processamento, falha, cancelamento, expiração e aprovação aparecem corretamente e direitos só existem após aprovação.
4. Reembolso altera o pedido, reverte os direitos/ledger conforme regra e impede novos downloads.
5. Duas compras concorrentes de licença exclusiva resultam em uma única venda válida, com logs diagnósticos seguros.
**Plans**: 3 plans

Plans:
- [ ] 06-01: Unificar mapeamento e reconciliação de status entre Worker, tentativas e pedidos.
- [ ] 06-02: Endurecer idempotência, reembolso, reversões e concorrência de exclusividade.
- [ ] 06-03: Adicionar logging seguro e testes de webhook/status/replay/falha.

### Phase 7: Testes, Regressões e Acabamento
**Goal**: Demonstrar que o marco é seguro, funcional, responsivo e não quebra os fluxos existentes antes do deploy.
**Depends on**: Phase 6
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07, QUAL-08
**UI hint**: yes
**Success Criteria**:
1. Testes automatizados provam isolamento entre usuários, snapshot imutável, entitlement por status e idempotência/reembolso/exclusividade.
2. Fluxos reais de perfil, chat, contrato e download apontam para o produtor/item correto após refresh e novo login.
3. Loading, vazio, erro, lista extensa e detalhe funcionam nos viewports desktop e mobile definidos.
4. Carrinho, checkout, autenticação, perfil, chat, player, catálogo e rotas existentes permanecem aprovados.
5. Build final e revisão visual passam sem conteúdo fake, vazamento, regressão global ou divergência de `dist/`.
**Plans**: 3 plans

Plans:
- [ ] 07-01: Criar suíte de integração/autorização e executar regressões funcionais existentes.
- [ ] 07-02: Executar matriz visual responsiva e corrigir somente problemas locais da área.
- [ ] 07-03: Validar build, diff de `dist/`, segurança final e checklist de aceite ponta a ponta.

## Acceptance Matrix

| Área | Evidência obrigatória |
|------|-----------------------|
| Isolamento | Usuário A recebe negação ao consultar ou baixar pedido de B |
| Snapshot | Editar licença/beat não altera pedido, contrato nem arquivos históricos |
| Idempotência | Replays de checkout/status/webhook mantêm um único `order_id` |
| Estados | Pendente/falho não libera; pago libera; reembolso revoga |
| Arquivos | Apenas formatos adquiridos; URL assinada expira; caminho inválido falha |
| Produtor | Nome/avatar/perfil/chat correspondem ao `producer_id` do item |
| Persistência | Refresh e novo login recuperam pedido e direitos do banco |
| Paginação | Lista extensa não exige carregar todos os detalhes previamente |
| UI | Desktop/mobile, skeleton, vazio e erro aprovados sem laranja estrutural |
| Regressão | Testes existentes, build e fluxos críticos permanecem aprovados |

## Critical Discovery Resolution

| Descoberta auditada | Requisito(s) | Fase | Evidência de resolução |
|----------------------|--------------|------|-----------------------|
| Trigger executado antes dos `order_items` | DATA-03, DATA-05, DATA-06 | Phase 2 | Ordem transacional explícita; rollback atômico; teste sem `completed → completed` |
| Pedidos pagos antigos sem entitlement/contrato | DATA-04 | Phase 2 | Auditoria e backfill idempotente sem duplicação |
| Idempotência de webhook | PAY-02, DATA-03 | Phase 2 | Replay de webhook/status/checkout mantém um pedido e um conjunto de direitos |
| `localStorage` no estado de compras | LIST-01 | Phase 3 | Removido como fonte de pedidos/pagamentos/direitos; permitido apenas para UI temporária |
| Paginação após carregar todos os pedidos | LIST-05 | Phase 3 | Range/cursor aplicado na consulta real antes de retornar dados |
| Contrato fallback gerado no navegador | FILE-05 | Phase 5 | Documento persistido/autorizado entre dispositivos; fallback removido ou justificado tecnicamente |

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Auditoria da Implementação Atual | 2/2 | Complete   | 2026-06-22 |
| 2. Modelo, Snapshot e Segurança | 7/7 | Complete   | 2026-06-22 |
| 3. Listagem Real e Premium | 0/3 | Not started | - |
| 4. Detalhes, Perfil e Chat | 0/2 | Not started | - |
| 5. Downloads e Contratos Protegidos | 0/3 | Not started | - |
| 6. Pagamentos e Estados Especiais | 0/3 | Not started | - |
| 7. Testes, Regressões e Acabamento | 0/3 | Not started | - |

---
*Roadmap proposed: 2026-06-22*
*Awaiting user review before Phase 2 implementation*
