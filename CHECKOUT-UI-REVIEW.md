# Revisão UI — coluna de pagamento do checkout

Referência auditada: coluna compacta de pagamento fornecida pelo usuário. Escopo: somente a coluna direita; a coluna de resumo permaneceu intacta.

| Pilar | Nota | Evidência |
| --- | ---: | --- |
| Copywriting | 4/4 | Labels diretas, CTA dinâmico por método e texto auxiliar curto. |
| Visuals | 4/4 | Superfícies escuras, bordas discretas, Pix e bandeiras oficiais, azul restrito à seleção e CTA. |
| Color | 4/4 | Contraste consistente com os tokens existentes e foco visível sem brilho excessivo. |
| Typography | 4/4 | Labels 11px, campos 13px, controles 11px e total com hierarquia compacta. |
| Spacing | 4/4 | Formulário de 380px, controles de 42–46px, métodos de 68px e ritmo vertical de 9–11px. |
| Experience design | 4/4 | Cartão/Pix alternáveis, labels reais, teclado, termos obrigatórios, feedback e valores reais preservados. |

## Decisões

- Não foram adicionados PayPal, Apple Pay, Google Pay, Alipay ou campos de endereço sem uso no backend.
- IDs, `data-*`, handlers, tokenização do cartão, emissor, parcelas, Pix, idempotência e callbacks do Mercado Pago foram preservados.
- O layout usa dimensões CSS reais, sem `zoom` ou `transform: scale`.
- Em telas abaixo de 900px, pagamento desce para uma coluna; abaixo de 390px, pares de campos passam a uma coluna.
