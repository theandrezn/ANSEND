# Requirements: ANSEND - Área Premium de Pedidos e Compras

**Defined:** 2026-06-22
**Core Value:** Depois de uma compra confirmada, somente o comprador correto consegue reencontrar e acessar exatamente o beat, a licença, o contrato e os arquivos que adquiriu.

## v1 Requirements

### Auditoria

- [x] **AUD-01**: A equipe consegue consultar um inventário documentado da rota `#compras`, renderers, estilos, handlers e componentes compartilhados atuais.
- [ ] **AUD-02**: A equipe consegue rastrear documentalmente uma compra desde beat + licença até carrinho, checkout, Mercado Pago, webhook, pedido, entitlement, contrato e download.
- [ ] **AUD-03**: A equipe consegue consultar o modelo real de tabelas, relações, RLS, funções, triggers, índices, endpoints e queries relacionados a compras.
- [ ] **AUD-04**: A equipe dispõe de uma matriz documentada que classifica cada parte atual como reutilizar, corrigir, remover ou preservar, incluindo mocks, `localStorage` e fallbacks.

### Modelo e Segurança

- [ ] **DATA-01**: Cada item pago preserva snapshot imutável de beat, produtor, licença, preço, moeda, termos, direitos, restrições, royalties, formatos e dados contratuais necessários.
- [ ] **DATA-02**: Alterar posteriormente beat ou licença não modifica os dados apresentados nem os direitos de uma compra concluída.
- [ ] **DATA-03**: A função/trigger/serviço responsável pela finalização identifica e executa explicitamente a ordem pagamento aprovado → pedido → `order_items` → entitlements/documentos/ledger dentro de uma fronteira transacional segura.
- [ ] **DATA-04**: Pedidos antigos pagos sem entitlement ou contrato recebem backfill idempotente, auditável e seguro, sem duplicar direitos, documentos ou lançamentos já existentes.
- [ ] **DATA-05**: Falha ao criar qualquer `order_item` ou direito obrigatório provoca rollback/falha atômica, sem deixar pedido concluído parcial.
- [ ] **DATA-06**: A criação de entitlements e contratos não depende de uma atualização artificial `completed → completed` e ocorre somente quando os itens necessários já existem.
- [ ] **SEC-01**: O comprador autenticado consegue ler somente seus próprios pedidos, itens, tentativas, entitlements, documentos e logs permitidos.
- [ ] **SEC-02**: Alterar IDs no hash, request ou código cliente não permite ler dados nem baixar arquivos de outro comprador.
- [ ] **SEC-03**: O produtor acessa somente os dados necessários de vendas dos próprios beats, sem obter dados privados indevidos do comprador.
- [ ] **SEC-04**: Operações privilegiadas de compra, entitlement, reembolso e download permanecem protegidas no backend com RLS ativa.

### Listagem

- [ ] **LIST-01**: O comprador visualiza na rota existente `#compras` seus pedidos e tentativas reais; `localStorage` pode guardar apenas preferências temporárias de interface e nunca pedidos, pagamentos, direitos ou downloads.
- [ ] **LIST-02**: Cada linha apresenta capa, beat, produtor, licença, data, valor, moeda, status real e ação de detalhes conforme os dados disponíveis.
- [ ] **LIST-03**: O comprador filtra por todos, pagos, pendentes/em processamento, problemas de pagamento e reembolsados usando estados reais do backend.
- [ ] **LIST-04**: O comprador pesquisa e ordena pedidos sem perder o vínculo com dados reais.
- [ ] **LIST-05**: A consulta real ao backend/Supabase pagina ou carrega incrementalmente antes de retornar os dados, sem buscar todos os pedidos para aplicar `slice()` no frontend.
- [ ] **LIST-06**: A página apresenta skeleton, vazio útil, erro recuperável e carregamento incremental coerente.
- [ ] **LIST-07**: A listagem possui layout premium escuro, neutro, responsivo e acessível, com laranja apenas em destaques pontuais.

### Detalhes e Integrações

- [ ] **DETL-01**: O comprador abre detalhes dentro da experiência existente de `#compras`, sem rota ou página paralela.
- [ ] **DETL-02**: O detalhe mostra dados reais e históricos do pedido, item, beat, licença, pagamento, valor, moeda, gateway e data.
- [ ] **DETL-03**: O detalhe mostra o produtor real com nome, avatar ou fallback minimalista e link para a rota pública existente.
- [ ] **DETL-04**: O comprador inicia ou continua uma conversa real com o produtor pelo sistema de chat existente.
- [ ] **DETL-05**: O detalhe mostra estado de carregamento, pedido inexistente/não autorizado e erro recuperável sem vazar existência ou IDs sensíveis.
- [ ] **DETL-06**: Um pedido com múltiplos itens permite acessar cada item e seus direitos corretos sem assumir apenas o primeiro beat.

### Downloads e Contratos

- [ ] **FILE-01**: Pedido pago concede somente os formatos incluídos no snapshot da licença adquirida.
- [ ] **FILE-02**: Pedido pendente, falho, cancelado, expirado ou reembolsado não concede entitlement ativo nem download.
- [ ] **FILE-03**: Cada download valida sessão, propriedade, pedido, item, entitlement, formato, status e existência do arquivo no backend.
- [ ] **FILE-04**: Arquivos privados são entregues por URL assinada temporária e nenhuma URL permanente privada é exposta.
- [ ] **FILE-05**: O contrato persistido e autorizado no backend reflete o snapshot real, pode ser visualizado ou baixado após refresh, novo login e outro dispositivo, e substitui o fallback gerado apenas no navegador salvo justificativa técnica documentada e equivalente em segurança/persistência.
- [ ] **FILE-06**: Recarregar a página ou entrar novamente mantém pedidos, documentos e downloads autorizados disponíveis.
- [ ] **FILE-07**: Arquivo ausente, caminho inválido, entitlement revogado e falha de assinatura produzem estados seguros e recuperáveis.
- [ ] **FILE-08**: Downloads autorizados e recusados relevantes geram logs seguros e úteis sem expor secrets.

### Pagamentos e Ciclo de Vida

- [ ] **PAY-01**: O backend valida beat, licença, disponibilidade, preço, moeda e valor pago antes de criar um pedido concluído.
- [ ] **PAY-02**: Reenvio de checkout, consulta de status ou webhook para o mesmo pagamento não cria um segundo pedido.
- [ ] **PAY-03**: A área reflete status `created`, `pending`, `in_process`, `approved/completed`, `rejected`, `cancelled`, `expired` e `refunded` conforme o modelo real.
- [ ] **PAY-04**: Pagamento pendente ou falho nunca é apresentado como pago e nunca libera direitos antecipadamente.
- [ ] **PAY-05**: Reembolso atualiza o pedido, reverte/revoga os direitos e impede novos downloads conforme a regra definida.
- [ ] **PAY-06**: Compra exclusiva concorrente vende uma única vez e impede novas compras após confirmação válida.
- [ ] **PAY-07**: Logs de reconciliação permitem diagnosticar pagamento e webhook sem registrar chaves, tokens ou dados sensíveis desnecessários.

### Qualidade e Regressão

- [ ] **QUAL-01**: Testes provam que usuário A não consegue consultar nem baixar recursos do pedido do usuário B.
- [ ] **QUAL-02**: Testes provam que snapshots e contratos não mudam após edição da licença original.
- [ ] **QUAL-03**: Testes provam idempotência, bloqueio pré-confirmação, reembolso e venda exclusiva.
- [ ] **QUAL-04**: Testes provam integração real de perfil, chat, contrato e downloads com o item/produtor correto.
- [ ] **QUAL-05**: Estados loading, vazio, erro e listas extensas funcionam em desktop e mobile sem conteúdo fake.
- [ ] **QUAL-06**: Carrinho, checkout, autenticação, perfil, chat, player, catálogo e rotas existentes não apresentam regressão.
- [ ] **QUAL-07**: O build de produção conclui e `dist/` corresponde às fontes alteradas.
- [ ] **QUAL-08**: A revisão visual confirma ausência de bordas/faixas laranja excessivas, caixas aninhadas, zoom aparente e alterações globais não solicitadas.

## v2 Requirements

### Operação

- **OPER-01**: Administradores dispõem de painel dedicado para suporte e disputa de pedidos com trilha de auditoria.
- **OPER-02**: Compradores recebem notificações externas por e-mail sobre mudanças de pagamento e disponibilidade de arquivos.
- **OPER-03**: Produtores acompanham analytics avançados de downloads e conversão por licença.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Nova rota ou segunda página de pedidos | `#compras` já é a superfície canônica e deve ser evoluída |
| Novo gateway ou checkout | Mercado Pago e o checkout atual são restrições do marco |
| Redesign de carrinho/checkout | Não é necessário para entregar a área de membros |
| Nova autenticação | Supabase Auth já identifica e protege compradores |
| Reescrita do SPA ou migração de framework | Amplia risco e não resolve o ciclo de pedidos |
| Pedidos/contratos simulados como resultado final | Banco e backend são a fonte de verdade |
| Arquivos privados públicos | Viola o requisito de autorização por compra |
| Mudanças visuais globais | O redesign é local à rota `#compras` |
| Execução automática das sete fases | O roadmap requer revisão do usuário antes de código funcional |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUD-01 | Phase 1 | Complete |
| AUD-02 | Phase 1 | Pending |
| AUD-03 | Phase 1 | Pending |
| AUD-04 | Phase 1 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 2 | Pending |
| DATA-04 | Phase 2 | Pending |
| SEC-01 | Phase 2 | Pending |
| SEC-02 | Phase 2 | Pending |
| SEC-03 | Phase 2 | Pending |
| SEC-04 | Phase 2 | Pending |
| LIST-01 | Phase 3 | Pending |
| LIST-02 | Phase 3 | Pending |
| LIST-03 | Phase 3 | Pending |
| LIST-04 | Phase 3 | Pending |
| LIST-05 | Phase 3 | Pending |
| LIST-06 | Phase 3 | Pending |
| LIST-07 | Phase 3 | Pending |
| DETL-01 | Phase 4 | Pending |
| DETL-02 | Phase 4 | Pending |
| DETL-03 | Phase 4 | Pending |
| DETL-04 | Phase 4 | Pending |
| DETL-05 | Phase 4 | Pending |
| DETL-06 | Phase 4 | Pending |
| FILE-01 | Phase 5 | Pending |
| FILE-02 | Phase 5 | Pending |
| FILE-03 | Phase 5 | Pending |
| FILE-04 | Phase 5 | Pending |
| FILE-05 | Phase 5 | Pending |
| FILE-06 | Phase 5 | Pending |
| FILE-07 | Phase 5 | Pending |
| FILE-08 | Phase 5 | Pending |
| PAY-01 | Phase 6 | Pending |
| PAY-02 | Phase 2 | Pending |
| PAY-03 | Phase 6 | Pending |
| PAY-04 | Phase 6 | Pending |
| PAY-05 | Phase 6 | Pending |
| PAY-06 | Phase 2 | Pending |
| PAY-07 | Phase 6 | Pending |
| QUAL-01 | Phase 7 | Pending |
| QUAL-02 | Phase 7 | Pending |
| QUAL-03 | Phase 7 | Pending |
| QUAL-04 | Phase 7 | Pending |
| QUAL-05 | Phase 7 | Pending |
| QUAL-06 | Phase 7 | Pending |
| QUAL-07 | Phase 7 | Pending |
| QUAL-08 | Phase 7 | Pending |

| DATA-05 | Phase 2 | Pending |
| DATA-06 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 50 total
- Mapped to phases: 50
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-22*
*Last updated: 2026-06-22 after purchase-flow audit and initial scoping*
