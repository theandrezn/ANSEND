# Spec: Reposicionamento do Catálogo Animado da Hero — ANSEND

## Objetivo
Ajustar exclusivamente o posicionamento do catálogo animado da seção Hero (Início) da plataforma ANSEND, deslocando-o mais para a direita e um pouco mais para cima em resoluções de desktop (larguras >= 1024px). O posicionamento responsivo e as animações das tracks internas devem ser preservados sem regressões ou transbordamentos horizontais.

## Abordagem
Seguindo a **Abordagem A**, as regras de estilo serão incluídas exclusivamente ao final do arquivo [hero-collage.css](file:///c:/Ansend%203.0%20-%20AntiGravity/hero-collage.css).

1. **Elemento Alvo**: `.ansend-hero-catalog` (o contêiner absoluto pai que envolve todas as colunas).
2. **Método**: Uso de `margin-left` e `margin-top` com o modificador `!important` para garantir a sobreposição limpa às regras herdadas de `styles.css`, sem alterar os keyframes ou `transform` de translação vertical (`translate3d`) das tracks animadas.

## Especificação de Responsividade

* **Telas Grandes (Desktop >= 1280px)**:
  - Deslocamento horizontal: `+120px` para a direita.
  - Deslocamento vertical: `-55px` para cima.
  ```css
  @media (min-width: 1280px) {
    body[data-route="feed"] .ai-hero .ai-hero-layout .ansend-hero-catalog {
      margin-left: 120px !important;
      margin-top: -55px !important;
    }
  }
  ```

* **Telas Médias (Desktop/Tablet 1024px a 1279px)**:
  - Deslocamento horizontal: `+60px` para a direita (intermediário).
  - Deslocamento vertical: `-30px` para cima (intermediário).
  ```css
  @media (min-width: 1024px) and (max-width: 1279px) {
    body[data-route="feed"] .ai-hero .ai-hero-layout .ansend-hero-catalog {
      margin-left: 60px !important;
      margin-top: -30px !important;
    }
  }
  ```

* **Telas Menores (< 1024px)**:
  - Nenhuma regra adicional de deslocamento será aplicada. O comportamento responsivo atual e a ausência de barra de rolagem horizontal serão integralmente preservados.

## Plano de Validação
1. Executar o build do projeto com `npm run build`.
2. Executar o teste de regressão responsivo `node tests/responsive-regression-check.js` (ou os testes aplicáveis à Home/Mobile) para validar a ausência de vazamento de layout ou quebras na renderização.
3. Validar a integridade visual da Hero em resoluções de desktop (1600x900, 1440x900, 1366x768 e 1024x768).
