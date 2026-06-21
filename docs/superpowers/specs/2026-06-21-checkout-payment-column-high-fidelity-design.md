# Design: reconstrução fiel da coluna de pagamento

Data: 21 de junho de 2026  
Status: aprovado pelo usuário no companion visual  
Referência: painel escuro compacto enviado em `codex-clipboard-1c541b0f-611e-45e3-b515-c1142d7fa3a7.png`

## Objetivo

Reconstruir exclusivamente a coluna direita do checkout da ANSEND para reproduzir a linguagem visual da referência: painel estreito, controles densos, bordas discretas, campos de 40–42px, CTA azul de 42px e hierarquia tipográfica compacta. A coluna esquerda, o carrinho e toda a integração de pagamento permanecem inalterados.

## Decisão aprovada

Foi aprovada a opção C:

- topo com `Cartão`, `Pix` e `PayPal`;
- grade abaixo com `Cartão`, `Pix`, `Apple Pay`, `Google Pay` e `Alipay`;
- Cartão e Pix funcionais;
- PayPal, Apple Pay, Google Pay e Alipay visíveis, mas nativamente desabilitados, com `disabled` e `aria-disabled="true"`;
- nenhuma opção desabilitada dispara handler, requisição ou simula pagamento.

## Arquitetura

A implementação continuará na SPA vanilla existente:

- `checkout/checkout.js`: somente estrutura HTML da coluna direita e semântica dos controles;
- `checkout/checkout.css`: estilos isolados sob `.ansend-checkout`;
- `scripts/render-checkout-reference.js`: captura dos estados Cartão e Pix em 1920×1080;
- testes de contrato visual em `tests/`;
- `dist/`: gerado pelo build existente.

Não serão adicionados React, Tailwind, Radix ou novas dependências. HTML e CSS reproduzem integralmente geometria, bordas e estados sem introduzir outro runtime, mount/unmount, estado paralelo ou risco ao MercadoPago.js CardForm.

## Componentes preservados

- Mercado Pago CardForm e seus containers seguros de número, validade e CVV;
- tokenização, bandeira, emissor e parcelas;
- geração e acompanhamento do Pix;
- `setPaymentMethod`, validações, termos, loading, feedback, idempotência e callbacks;
- valores dinâmicos de subtotal e total;
- todos os IDs e `data-*` consumidos pela integração;
- rota, autenticação, Supabase, backend, carrinho e coluna esquerda.

## Estrutura visual

### Container

- largura interna: `360px`, responsiva até `min(100%, 360px)`;
- fundo da coluna: `#111314`;
- sem card externo envolvendo o formulário;
- centralização horizontal e vertical no desktop;
- fluxo vertical compacto de 8–10px;
- sem `zoom`, `transform: scale` ou alteração da fonte raiz.

### Seletor superior

- três segmentos com 40px de altura total;
- raio externo de 6px e raio interno de 5px;
- fundo `#1d1f21`;
- ativo em `#2b2d2f` sem contorno azul;
- fonte de 9–10px;
- PayPal com opacidade reduzida e cursor desabilitado.

### Grade de métodos

- cinco colunas iguais, altura de 58–62px e gap de 6px;
- cards com raio de 6px e borda `#292c30`;
- selecionado com borda `#2f7fff` de 1–2px e halo azul sutil;
- ícone acima e nome abaixo;
- opções desabilitadas com opacidade reduzida, sem hover enganoso;
- a área inteira dos controles funcionais é clicável;
- Cartão e Pix compartilham um grupo de seleção acessível; os estados visuais continuam sincronizados pelo handler existente.

### Linha de segurança

- altura de 30–38px;
- cadeado de 11px, texto de 9px e link `Saiba mais` alinhado à direita;
- cor secundária `#73777d`.

### Campos

- labels externas de 10px, line-height 1.3 e margem inferior de 5px;
- inputs e containers seguros de 40–42px;
- fundo `#121416`;
- borda de 1px `#292c30`;
- raio de 5px;
- padding horizontal de 10px;
- texto de 11–12px e placeholder em `#73777d`;
- foco com borda azul fina, sem glow exagerado;
- número do cartão com bandeiras pequenas à direita;
- validade e CVV em duas colunas com gap de 8px;
- bloco contíguo, inspirado no endereço da referência, aplicado aos dados reais da ANSEND: CPF/CNPJ, banco emissor, parcelas e telefone;
- nenhum campo de endereço será coletado ou persistido.

No Pix, os campos reais continuam sendo e-mail, nome completo, CPF/CNPJ e telefone, usando a mesma geometria. O bloco informativo do Pix permanece compacto e o resultado com QR Code continua no mesmo shell.

### Termos, preços e CTA

- checkbox de 13px alinhado ao topo;
- texto de termos com 8–9px e contraste reduzido;
- subtotal de 10px e total de 12–14px, sem card externo;
- CTA com largura total, altura de 42px, raio de 5px e fundo `#2f7fff`;
- texto central de 11px/600 e cadeado de 10–11px à direita;
- hover e active discretos, sem mudança de tamanho;
- loading e disabled preservam exatamente as dimensões;
- rodapé de 8–9px, centralizado e próximo do CTA.

## Interação e dados

Cartão e Pix continuam chamando o mesmo `setPaymentMethod`. Os dois conjuntos de controles visuais refletem a mesma fonte de verdade. A troca de método apenas alterna os painéis existentes e o texto dinâmico do CTA. Campos seguros permanecem controlados pelo Mercado Pago. Nenhum dado é copiado para um segundo estado.

Os métodos desabilitados não recebem `data-checkout-method` funcional e não entram no fluxo de eventos. Tooltips ou texto acessível indicarão `Em breve` sem alterar a referência visual principal.

## Responsividade

- `>= 900px`: checkout dividido; formulário de 360px centralizado;
- `< 900px`: coluna de pagamento abaixo do resumo, mantendo o formulário centralizado;
- `< 420px`: largura disponível com padding lateral de 16px; a grade de cinco métodos reduz tipografia e gaps, sem overflow;
- pares de campos podem empilhar abaixo de 390px;
- nenhuma correção mobile altera as medidas desktop.

## Acessibilidade

- foco visível e navegação por teclado;
- labels associados aos campos e `aria-labelledby` nos elementos seguros;
- controles desabilitados com semântica nativa;
- `aria-live` preservado para feedback e estados do pagamento;
- contraste suficiente e `prefers-reduced-motion` preservado;
- nenhuma informação depende apenas de cor.

## Testes e auditoria

O trabalho seguirá TDD:

1. criar ou atualizar o contrato visual e observar falha pela estrutura atual;
2. implementar o mínimo para passar;
3. executar testes de checkout, CardForm, Pix, pricing, banco, idempotência e webhook;
4. executar build e `git diff --check`;
5. capturar Cartão e Pix em 1920×1080, 1440×900, 1366×768, tablet e mobile;
6. comparar referência e implementação no companion visual;
7. ajustar tipografia, geometria, cores e posição até eliminar as diferenças relevantes;
8. confirmar que a coluna esquerda não mudou.

## Critérios de aceite

- campos e CTA reproduzem a referência em dimensões, radius, cores e hierarquia;
- Opção C está implementada sem pagamentos falsos;
- Cartão e Pix continuam funcionais;
- coluna esquerda e outras rotas permanecem intactas;
- sem CSS global, estado duplicado, segunda aplicação ou dependências desnecessárias;
- sem overflow ou corte nas resoluções obrigatórias;
- testes, build e auditoria visual concluídos antes do deploy.
