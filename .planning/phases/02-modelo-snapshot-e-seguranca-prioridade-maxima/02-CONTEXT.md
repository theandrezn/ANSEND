# Phase 2: Modelo, Snapshot e Segurança (Prioridade Máxima) - Context

**Gathered:** 2026-06-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase elimina o risco de uma compra aprovada terminar sem todos os `order_items`, entitlements, documentos persistidos e lançamentos obrigatórios. Ela define uma representação histórica imutável da compra, corrige a ordem transacional, garante idempotência e rollback, recupera pedidos pagos antigos com segurança e preserva RLS, Mercado Pago, downloads assinados e os fluxos existentes. Nenhuma interface nova pertence a esta fase, e a Fase 3 permanece bloqueada até a comprovação integral desse contrato.

</domain>

<decisions>
## Implementation Decisions

### Snapshot histórico
- **D-01:** Os dados comerciais de cada item pago ficam congelados no momento da compra: beat, título, capa, produtor, licença, preço, moeda, termos, direitos, restrições, royalties, formatos e demais dados contratuais necessários.
- **D-02:** Mudanças ou remoções posteriores no beat, licença ou perfil não alteram nem tornam ilegível a compra histórica.
- **D-03:** O perfil público atual do produtor permanece como vínculo dinâmico separado. Ele não substitui nem reescreve a identidade histórica registrada no item.
- **D-04:** A identidade contratual fornecida pelo comprador no momento da compra também é preservada. Alterações futuras no perfil não reescrevem o contrato já adquirido.

### Backfill de pedidos pagos antigos
- **D-05:** O backfill automático pode criar somente direitos e documentos que sejam comprováveis a partir dos dados históricos do pedido e de suas relações persistidas.
- **D-06:** O catálogo atual não pode ser usado para inventar termos, formatos ou direitos ausentes de uma compra antiga.
- **D-07:** Casos ambíguos devem ser inventariados e separados para resolução auditada, sem criar entitlement ou contrato presumido.
- **D-08:** Qualquer caso pago ambíguo ou ainda sem item, entitlement e documento obrigatórios bloqueia a conclusão da Fase 2 e, portanto, o início funcional da Fase 3.
- **D-09:** A execução e a repetição do backfill precisam ser observáveis e resultar em no-op para registros já íntegros, sem duplicar direitos, documentos ou ledger.

### Privacidade e acesso do produtor
- **D-10:** O produtor pode acessar o contrato persistido e autorizado relativo apenas às vendas de seus próprios beats.
- **D-11:** O produtor recebe somente a identificação do comprador exigida no próprio documento contratual; nenhum conjunto adicional de campos privados deve ser exposto por conveniência.
- **D-12:** Metadados de pagamento, tokens, secrets e dados pessoais desnecessários permanecem ocultos do produtor e do frontend.
- **D-13:** RLS e grants devem manter o comprador isolado e limitar o produtor ao mínimo necessário para comprovar e atender a própria venda.

### Decisões já bloqueadas pelo roadmap e pela auditoria
- A correção deve identificar e delimitar as responsabilidades de `finalize_checkout_payment()`, `process_checkout()`, `manage_purchase_entitlements()` e dos handlers de reconciliação do Worker.
- A ordem aprovada é pagamento validado, pedido, todos os itens, entitlements/documentos/ledger e vínculo final da tentativa, dentro de fronteira transacional segura.
- Nenhum direito pode depender de uma atualização artificial `completed -> completed`.
- Falha na criação de item ou direito obrigatório deve falhar atomicamente, sem pedido concluído parcial.
- Replay de checkout, status ou webhook deve retornar a mesma compra e não duplicar pedido, entitlement, documento, ledger ou venda exclusiva.
- A rota `#compras`, o renderer atual, Mercado Pago, RLS, downloads assinados e os componentes funcionais existentes devem ser preservados.

### the agent's Discretion
- Escolher o formato estruturado mínimo do snapshot, as chaves de unicidade, a divisão exata entre funções/RPCs e a estratégia de locking, desde que todas as decisões e requisitos acima sejam demonstrados por testes reais.
- Definir o formato operacional do relatório de auditoria e do dry-run do backfill, sem expor dados sensíveis.
- Definir índices e grants mínimos necessários após verificar o esquema e as políticas atuais.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Escopo e requisitos
- `.planning/PROJECT.md` - Define valor central, constraints e decisões permanentes do marco.
- `.planning/ROADMAP.md` - Define o limite, os quatro planos e o blocking gate da Fase 2.
- `.planning/REQUIREMENTS.md` - Define DATA-01 a DATA-06, SEC-01 a SEC-04, PAY-02 e PAY-06.
- `.planning/STATE.md` - Registra o estado verificado da Fase 1 e os bloqueadores ativos.

### Evidência da auditoria
- `.planning/phases/01-auditoria-da-implementacao-atual/01-BACKEND-AUDIT.md` - Rastreia a ordem SQL real, o trigger prematuro, as lacunas de snapshot, RLS, download e testes.
- `.planning/phases/01-auditoria-da-implementacao-atual/01-CHANGE-MATRIX.md` - Classifica o que preservar, reutilizar ou corrigir e define as provas obrigatórias por descoberta.
- `.planning/phases/01-auditoria-da-implementacao-atual/01-VERIFICATION.md` - Confirma a conclusão auditada da Fase 1 e o gate de entrada da Fase 2.

### Implementação existente
- `supabase/schema.sql` - Fonte consolidada do modelo, funções, triggers, RLS, grants e índices.
- `supabase/migrations/20260620190000_secure_checkout_payments.sql` - Base do checkout seguro e das tentativas idempotentes.
- `supabase/migrations/20260621183000_purchases_member_area.sql` - Criação atual de entitlements, documentos, ledger e trigger de compras.
- `src/worker.mjs` - Checkout Mercado Pago, webhook, consulta de status, reconciliação e chamada ao RPC de finalização.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `payment_attempts` e seus índices: preservam idempotency key, provider payment ID, fingerprint e vínculo ao pedido.
- `finalize_checkout_payment()`: já bloqueia a tentativa com `FOR UPDATE` e retorna o pedido existente quando `order_id` está vinculado.
- `process_checkout()`: já bloqueia beats, valida licenças e disponibilidade e protege a venda exclusiva.
- `purchase_entitlements`, `license_documents` e `seller_ledger_entries`: continuam sendo as estruturas canônicas, após correção de cardinalidade, snapshot e unicidade.
- Worker Mercado Pago: autenticação, validação do carrinho, verificação HMAC e consulta da verdade do provedor devem ser reutilizadas.

### Established Patterns
- Mudanças de banco exigem migration ordenada e sincronização correspondente de `supabase/schema.sql`.
- Funções privilegiadas usam `security definer`, `search_path` explícito, grants mínimos e checagens internas.
- Dados persistentes autenticados são autoritativos no Supabase; estado local não pode fabricar compra ou direito.
- O checkout e a finalização cruzando tabelas devem permanecer transacionais e protegidos no backend.

### Integration Points
- `src/worker.mjs` converge checkout, webhook e status para a mesma reconciliação/finalização.
- `finalize_checkout_payment()` chama `process_checkout()` e deve conservar o retorno idempotente da tentativa.
- O trigger atual em `orders` executa antes dos `order_items`; a responsabilidade por criar direitos precisa ocorrer explicitamente somente depois da existência de todos os itens.
- RLS permite leitura do comprador e algum acesso do produtor; grants e antigas policies de insert autenticado precisam ser auditados contra o caminho exclusivo do backend.

</code_context>

<specifics>
## Specific Ideas

- Uma compra deve continuar legível pelo snapshot mesmo quando o beat ou perfil original não estiver mais disponível.
- O perfil atual do produtor pode evoluir, mas aparece como referência separada e nunca altera o registro histórico.
- O backfill deve produzir contagens antes/depois, identificar ambiguidades e permitir rerun sem efeito colateral.
- A existência de um único pedido não basta para provar idempotência: item, entitlement, documento, ledger e exclusividade também precisam ter cardinalidade correta.

</specifics>

<deferred>
## Deferred Ideas

- A remoção de `localStorage` como fonte de compras e a paginação real pertencem à Fase 3.
- A apresentação detalhada e a navegação para perfil/chat pertencem à Fase 4.
- A entrega item-específica dos downloads e a remoção do contrato fallback no navegador pertencem à Fase 5, apoiadas no snapshot e no documento persistido criados nesta fase.
- Reconciliação completa de reembolso e demais estados especiais pertence à Fase 6, sem enfraquecer a idempotência estabelecida aqui.

</deferred>

---

*Phase: 02-modelo-snapshot-e-seguranca-prioridade-maxima*
*Context gathered: 2026-06-22*
