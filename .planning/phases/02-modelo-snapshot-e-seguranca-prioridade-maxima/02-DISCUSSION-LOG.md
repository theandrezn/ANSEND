# Phase 2: Modelo, Snapshot e Segurança (Prioridade Máxima) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md; this log preserves the alternatives considered.

**Date:** 2026-06-22
**Phase:** 2 - Modelo, Snapshot e Segurança (Prioridade Máxima)
**Areas discussed:** Snapshot histórico, backfill de pedidos pagos antigos, privacidade do comprador

---

## Snapshot histórico

### Dados comerciais e perfil atual

| Option | Description | Selected |
|--------|-------------|----------|
| Snapshot imutável + perfil atual | Congela título, capa, produtor, licença, preço, moeda e direitos; mantém apenas o vínculo ao perfil atual como dinâmico. | ✓ |
| Tudo congelado | Mantém inclusive nome, foto e referência exibida do produtor sempre como na compra. | |
| Dados atuais com termos congelados | Permite que beat e produtor acompanhem alterações atuais, preservando somente licença e preço históricos. | |

**User's choice:** Snapshot imutável + perfil atual.
**Notes:** Se beat ou perfil for removido, a compra continua legível pelo snapshot; o perfil atual é uma referência separada.

### Identidade contratual do comprador

| Option | Description | Selected |
|--------|-------------|----------|
| Preservar identidade da compra | Mantém no contrato a identidade fornecida no momento da aquisição, mesmo após mudanças de perfil. | ✓ |
| Usar dados atuais do perfil | Reescreve a identidade contratual conforme o perfil vigente. | |
| Preservar apenas o nome | Congela o nome, sem outros dados contratuais necessários. | |

**User's choice:** Preservar identidade da compra.
**Notes:** A identidade contratual faz parte do registro histórico imutável.

---

## Backfill de pedidos pagos antigos

### Reconstrução de direitos

| Option | Description | Selected |
|--------|-------------|----------|
| Corrigir casos comprováveis e separar os ambíguos | Automatiza somente quando os dados históricos sustentam o direito e encaminha exceções para auditoria. | ✓ |
| Reconstruir todos com dados atuais | Usa o catálogo e a licença atuais para preencher lacunas históricas. | |
| Revisão manual de todos | Não executa qualquer correção automática. | |

**User's choice:** Corrigir casos comprováveis e separar os ambíguos.
**Notes:** Nenhuma licença ou direito pode ser inventado com base apenas no catálogo atual.

### Efeito dos casos ambíguos no gate

| Option | Description | Selected |
|--------|-------------|----------|
| Bloquear a conclusão da Fase 2 | A fase permanece incompleta até cada pedido pago ambíguo ser resolvido de forma auditada. | ✓ |
| Permitir avanço com relatório | Mantém as exceções sem direitos e permite iniciar a próxima fase. | |
| Liberar acesso provisório | Libera arquivos antes de existir contrato ou direito definitivamente comprovado. | |

**User's choice:** Bloquear a conclusão da Fase 2 até resolução.
**Notes:** O gate não admite pedido pago ainda sem itens, entitlement, contrato ou arquivos autorizados.

---

## Privacidade do comprador

| Option | Description | Selected |
|--------|-------------|----------|
| Contrato persistido + dados mínimos | O produtor acessa o documento autorizado da própria venda e apenas a identificação exigida nele, sem campos privados adicionais ou metadados de pagamento. | ✓ |
| Nome público e resumo | O produtor vê resumo da venda, mas não o contrato completo. | |
| Dados completos da transação | Expõe nome, e-mail, documento e detalhes amplos de pagamento. | |

**User's choice:** Contrato persistido + dados mínimos.
**Notes:** RLS deve limitar o produtor às próprias vendas e ocultar payment metadata, tokens, secrets e dados pessoais desnecessários.

---

## the agent's Discretion

- Estrutura exata do snapshot e das chaves de unicidade.
- Distribuição técnica de responsabilidades entre funções/RPCs existentes.
- Formato seguro do dry-run, relatório de auditoria e observabilidade do backfill.
- Índices, locks e grants mínimos necessários para cumprir os requisitos.

## Deferred Ideas

- `localStorage` e paginação real: Fase 3.
- Detalhe, perfil e chat: Fase 4.
- Download específico por item e remoção do fallback contratual no navegador: Fase 5.
- Reembolso e estados especiais completos: Fase 6.
