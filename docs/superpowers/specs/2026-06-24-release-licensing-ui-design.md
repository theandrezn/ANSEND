# Especificação de Design: Redesenho UI/UX da Etapa de Licenças (Etapa 3)

Esta especificação define o refinamento de design de interface (UI) e experiência do usuário (UX) para a etapa "Licenças e Valores" do fluxo de publicação de beats da ANSEND, focando em um visual moderno, premium, limpo e escuro inspirado em ferramentas SaaS como Stripe, Linear e Vercel.

---

## 1. Estrutura de Layout e Alinhamento

* **Container Principal**:
  * Largura máxima limitada a `1160px` (`max-width: 1160px !important`).
  * Largura responsiva definida como `width: calc(100% - 40px) !important`.
  * Centralização automática com `margin-inline: auto !important`.
  * Espaçamento inferior adequado para que a barra de ações inferior não sobreponha os elementos.
* **Alinhamento do Cabeçalho**:
  * Alinhado horizontalmente à esquerda de forma idêntica à grade de cards de licença.

---

## 2. Tipografia e Estilo do Cabeçalho da Etapa

* **Título principal ("Licenças e valores")**:
  * Fonte: `Plus Jakarta Sans`, sans-serif.
  * Peso: `700` (Bold).
  * Tamanho: `32px` no desktop.
  * Espaçamento entre letras: `-0.025em` (letter-spacing levemente negativo para acabamento premium).
  * Altura de linha: `1.2`.
* **Descrição da etapa**:
  * Fonte: `Montserrat`, sans-serif.
  * Cor: `#8e8e93` (cinza secundário).
  * Tamanho: `14px`.
  * Largura máxima limitada a `500px` para melhor legibilidade.
  * Margem inferior da seção: `32px`.

---

## 3. Grade e Estrutura dos Cards de Licença (`.release-license-editor-card`)

* **Estrutura da Grade**:
  * Grid de duas colunas iguais no desktop (`grid-template-columns: repeat(2, minmax(0, 1fr))`).
  * Espaçamento (`gap`) de `18px`.
  * Altura de cards na mesma linha equilibrada (`align-items: stretch`).
* **Design do Card**:
  * Fundo (`background`): `#0b0b0c` (cinza de altíssima saturação e escuro, criando profundidade com o fundo preto absoluto `#000000` da página).
  * Borda: `1px solid #1e1e20` (borda discreta e fina).
  * Cantos arredondados: `12px` (`border-radius: 12px`).
  * Preenchimento interno (`padding`): `20px` em todas as laterais.
  * Altura mínima: `290px` para assegurar uniformidade.
  * Transição suave: Efeitos de cor e borda animados com `transition` de `0.2s cubic-bezier(0.16, 1, 0.3, 1)`.
  * Efeito de Hover: Fundo muda para `#0d0d0e` e borda para `#2b2b2f`.
  * Estado Inativo (`is-inactive-license`): Opacidade do card inteiro reduzida para `50%` (e `75%` em hover).

---

## 4. Elementos Internos do Card

### 4.1 Cabeçalho do Card
* **Título do Card**: Fonte `Plus Jakarta Sans`, peso `600`, tamanho `16px`, cor `#f5f5f7` e `letter-spacing: -0.02em`.
* **Badges Premium de Identificação**:
  * Letras maiúsculas, tamanho `9px`, peso `650`, cantos arredondados de `6px`, borda fina de 1px.
  * Cores e contrastes (baixa saturação):
    * *Básica*: Texto `#a1a1aa`, fundo `rgba(142, 142, 147, 0.1)`, borda `rgba(142, 142, 147, 0.15)`.
    * *Premium*: Texto `#60a5fa`, fundo `rgba(37, 99, 235, 0.08)`, borda `rgba(37, 99, 235, 0.18)`.
    * *Unlimited*: Texto `#c084fc`, fundo `rgba(139, 92, 246, 0.08)`, borda `rgba(139, 92, 246, 0.18)`.
    * *Exclusiva*: Texto `#f87171`, fundo `rgba(239, 68, 68, 0.08)`, borda `rgba(239, 68, 68, 0.18)`.
    * *Personalizada*: Texto `#fbbf24`, fundo `rgba(245, 158, 11, 0.08)`, borda `rgba(245, 158, 11, 0.18)`.
* **Barra de Controle Unificada**:
  * Agrupamento horizontal em uma barra de controle de fundo `#121214`, borda `1px solid #1e1e20` e cantos de `8px`.
  * Botões contendo ícones Lucide cinzas (`#8e8e93`) que iluminam para branco no hover (ou vermelho claro no botão de excluir).
  * Linha vertical fina de `1px` (`#1e1e20`) para separar o grupo de controle do switch de ativação.

### 4.2 Descrição do Card
* **Limite de Linhas**: Limitada a exatamente **2 linhas** (`display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;`).
* Estilo: Fonte `Montserrat`, tamanho `12px`, cor `#8e8e93`, altura de linha `1.5`, alinhado à esquerda.

### 4.3 Painel de Especificações Unificado
* **Container**: Grade de 3 colunas, cantos de `8px`, borda fina e separadores internos de `1px` (`background: #1e1e20; border: 1px solid #1e1e20; overflow: hidden; gap: 1px;`).
* **Visual das Células**: Fundo `#0d0d0e`, rótulo pequeno superior cinza de `9px` em caixa alta (`#8e8e93`), valor principal inferior de `12px` em branco (`#e4e4e7`).

### 4.4 Rodapé Unificado
* **Layout**: Linha flexível com borda superior fina de divisória (`1px solid #1e1e20`), alinhada e espaçada.
* **Input de Preço**:
  * Input com símbolo `R$` fixado na extrema esquerda de forma absoluta. Fundo `#080809`, borda `1px solid #1e1e20`, cor branca, cantos de `8px`, peso de fonte `600`, tamanho `13px`.
* **Botão Editar Termos**:
  * Altura idêntica à do input (`38px`), fundo `#121214`, borda `#1e1e20`, cantos de `8px`, ícone de engrenagem (`settings`) na lateral do texto.

---

## 5. Card de Adicionar Licença Personalizada (`.add-custom-license-card`)

* Borda tracejada fina (`1px dashed #1e1e20`), cantos de `12px`, fundo transparente.
* Efeito de Hover: Fundo muda suavemente para `#0b0b0c` e a borda para `#2b2b2f`.
* Ícone centralizado de "+" dentro de um círculo cinza que se ilumina no hover.
