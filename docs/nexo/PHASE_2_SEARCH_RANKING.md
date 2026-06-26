# ANSEND — NEXO IA — Fase 2: Motor de Busca, Filtros e Ranking

Data: 2026-06-25.

## 1. Resumo executivo

Foi implementado um motor determinístico de busca de beats, independente de OpenAI, acessível por `POST /api/nexo/search`. O motor valida filtros fechados, consulta dados comerciais reais sob JWT/RLS, reutiliza a elegibilidade da Fase 1, aplica filtros obrigatórios, calcula ranking auditável, controla diversidade e trata zero resultados sem relaxar restrições silenciosamente.

Resultado funcional local: implementado e coberto por testes unitários e integração do Worker.

Decisão: **NO-GO PARA FASE 3**. O histórico de migrations remoto continua divergente e o catálogo remoto contém zero beats recomendáveis: o único beat publicado não possui licença ativa válida associada.

## 2. Estado inicial

- Branch: `main`.
- Remote: `https://github.com/theandrezn/ANSEND.git`.
- Commit-base observado: `47481ac chore(deploy): sync auth layout build metadata`.
- A Fase 1 terminou em `NO-GO PARA FASE 2`.
- Bloqueios herdados:
  - migrations locais e remotas divergentes;
  - RLS e funções remotas não auditadas integralmente por SQL;
  - fallbacks de licença existentes em telas legadas;
  - métricas comportamentais remotas sem dados.
- Alterações locais anteriores foram preservadas.
- Nenhum commit, push, deploy ou migration foi executado.

## 3. Arquitetura implementada

### Módulos

- `src/nexo/search/schema.mjs`: contrato fechado e validação.
- `src/nexo/search/normalize.mjs`: normalização canônica, aliases e preços em centavos.
- `src/nexo/search/ranking.mjs`: filtros, score, matching reasons, diversidade e relaxamentos.
- `src/nexo/search/service.mjs`: interface única `searchNexoEntities()`.

### Fluxo

```text
POST /api/nexo/search
→ autenticação e rate limit
→ validação do request
→ normalização
→ consulta de até 121 beats
→ consulta agregada de licenças
→ consulta agregada de perfis
→ elegibilidade da Fase 1
→ filtros obrigatórios e texto
→ ranking e diversidade
→ resposta normalizada
```

O frontend não filtra catálogo e nenhuma interface visual nova foi criada.

## 4. Contrato de entrada

```json
{
  "entity_type": "beat",
  "query": "",
  "genres": [],
  "subgenres": [],
  "moods": [],
  "tags": [],
  "min_price": null,
  "max_price": null,
  "bpm_min": null,
  "bpm_max": null,
  "musical_key": null,
  "license_types": [],
  "producer_id": null,
  "sort": "relevance",
  "limit": 3,
  "cursor": null
}
```

Regras:

- campos desconhecidos são rejeitados;
- listas aceitam até oito strings;
- query aceita até 160 caracteres;
- preço não pode ser negativo;
- intervalos de preço e BPM devem ser coerentes;
- BPM fica entre 40 e 240;
- produtor deve ser UUID;
- limite fica entre 1 e 3;
- cursor deve ser `null`;
- sort aceita `relevance`, `price_asc`, `price_desc` ou `newest`;
- `professional` e `service` são entidades conhecidas, mas retornam `unsupported_entity_type`.

## 5. Normalização

A normalização remove acentos, uniformiza caixa e converte separadores em underscore. O valor original é preservado ao lado do valor normalizado.

Exemplos:

| Raw | Normalizado |
|---|---|
| `Trap Melódico` | `trap_melodico` |
| `trap-melodico` | `trap_melodico` |
| `R&B` | `rnb` |
| `UK Drill` | `uk_drill` |
| `C Minor` | `c_minor` |

`C#m` permanece distinto de `C minor`. Aliases não inferem gênero, mood ou tonalidade inexistentes.

Taxonomia remota observada:

- gêneros: `Trap`;
- subgêneros: nenhum valor preenchido;
- moods: nenhum valor preenchido;
- moeda de licença: `BRL`.

## 6. Elegibilidade

A fonte única é `evaluateBeatEligibility()` da Fase 1.

Um resultado precisa:

- existir;
- estar publicado e público;
- não ter venda exclusiva;
- possuir produtor público;
- possuir capa;
- possuir preview;
- possuir licença ativa, não-fallback, com preço positivo e moeda BRL;
- estar autorizado para o contexto.

Motivos estruturados incluem `not_published`, `not_visible`, `sold_exclusively`, `producer_unavailable`, `missing_cover`, `missing_preview`, `no_active_license`, `invalid_price`, `invalid_currency` e `unauthorized`.

## 7. Busca

### Estratégia

A implementação usa queries REST controladas no Worker, sem SQL livre:

1. `beats`: no máximo 121 linhas para detectar excesso sobre o limite seguro de 120;
2. `beat_licenses`: uma consulta para todos os IDs;
3. `public_profiles`: uma consulta para todos os produtores.

Filtros aplicados na consulta de beats quando disponíveis:

- status e visibilidade;
- venda exclusiva;
- produtor;
- BPM;
- tonalidade;
- gênero único.

Filtros após o join:

- elegibilidade completa;
- subgênero;
- moods;
- tags;
- preço;
- tipo de licença;
- texto.

Query textual não vazia exige pelo menos um token real em título, descrição, taxonomia, tags ou produtor.

## 8. Ranking

Versão: `nexo-beat-search-v1`.

| Componente | Peso | Fonte | Justificativa | Limitação |
|---|---:|---|---|---|
| Filter match | 0,30 | filtros estruturados | prioriza atributos pedidos | filtros obrigatórios já excluem incompatíveis |
| Text relevance | 0,30 | campos públicos reais | ordena correspondência lexical | sem full-text/trigram nesta fase |
| Price fit | 0,15 | menor licença válida | respeita orçamento sem favorecer preço alto | neutro sem filtro de preço |
| Metadata quality | 0,15 | completude do beat | favorece resultados explicáveis | não inventa campos ausentes |
| Freshness | 0,10 | publicação/criação | evita catálogo totalmente estático | limitado para não dominar |
| Behavior | 0,00 | métricas agregadas | ponto de extensão futuro | tabelas remotas atualmente vazias |

Todos os componentes e o total ficam entre zero e um. Os pesos somam um e não são controláveis pelo cliente.

Matching reasons possíveis:

- `genre_exact_match`;
- `subgenre_exact_match`;
- `mood_match`;
- `tag_match`;
- `license_type_match`;
- `musical_key_match`;
- `producer_match`;
- `bpm_in_range`;
- `within_budget`;
- `text_match`.

## 9. Diversidade

- remove IDs duplicados;
- remove previews duplicados;
- limita dois resultados por produtor;
- quando a diferença de score é até 0,05, prefere produtor ainda não exibido;
- permite repetição quando não existem alternativas válidas;
- nunca quebra filtros obrigatórios para diversificar.

## 10. Zero resultados

Resposta de zero resultados:

```json
{
  "results": [],
  "zero_result": true,
  "reason": "no_exact_matches",
  "relaxed_filters": [],
  "relaxation_options": []
}
```

Filtros nunca são relaxados automaticamente. Sugestões são produzidas somente se o pool elegível comprovar que:

- elevar o teto ao menor preço real liberaria resultado; ou
- remover um filtro específico liberaria resultado.

## 11. Endpoint ou serviço

### Interface interna

```javascript
searchNexoEntities(request, context)
```

### HTTP

```http
POST /api/nexo/search
Authorization: Bearer <jwt>
Content-Type: application/json
```

- autenticação obrigatória;
- payload máximo de 12 KB;
- 20 buscas por minuto por usuário, IP e rota;
- no máximo 120 candidatos;
- sem cache;
- respostas com `Cache-Control: no-store`.

Códigos de erro:

- `invalid_json`;
- `invalid_request`;
- `unsupported_entity_type`;
- `unauthorized`;
- `rate_limited`;
- `search_unavailable`;
- `candidate_limit_exceeded`.

## 12. Segurança

| Severidade | Problema | Evidência | Correção | Status |
|---|---|---|---|---|
| High | Drift de migrations | versões local-only e remote-only | reconciliar antes da Fase 3 | bloqueado |
| High | Catálogo sem licença comercial associada | 1 beat publicado e 0 recomendáveis | corrigir dados/migration por fluxo autorizado | bloqueado |
| Medium | RLS remota sem auditoria SQL integral | acesso atual limitado a REST/CLI de histórico | auditoria autenticada futura | bloqueado |
| Medium | Rate limit por isolate | `Map` em memória | suficiente para fase local; distribuir futuramente | aceito |
| Informational | Uso de JWT/RLS | três consultas usam publishable key + JWT | mantido | corrigido |
| Informational | SQL/colunas livres | contrato fechado e queries internas | mantido | corrigido |
| Informational | OpenAI | ausente do handler e serviço de busca | mantido | corrigido |

O endpoint não recebe user ID, pesos, status, SQL, colunas ou regras de elegibilidade.

## 13. Qualidade dos dados

Auditoria REST somente leitura em 2026-06-25:

| Métrica | Valor |
|---|---:|
| Beats publicados e públicos | 1 |
| Beats recomendáveis | 0 |
| Sem capa | 0 |
| Sem preview | 0 |
| Sem subgênero | 1 |
| Sem mood | 1 |
| Sem BPM | 0 |
| Sem tonalidade | 0 |
| Com produtor público inválido | 0 |
| Sem licença ativa válida associada | 1 |
| Licenças ativas totais | 1 |
| Licenças ativas sem vínculo ao beat público | 1 |
| Grupos de áudio duplicado | 0 |

Tabelas `content_metrics_daily`, `content_trend_scores` e `analytics_events` existem, mas retornaram contagem zero. Por isso o score comportamental permanece zero.

## 14. Alterações por arquivo

- `src/nexo/search/schema.mjs`: validação do contrato.
- `src/nexo/search/normalize.mjs`: normalização e aliases.
- `src/nexo/search/ranking.mjs`: filtros, ranking, diversidade e relaxamentos.
- `src/nexo/search/service.mjs`: orquestração determinística.
- `src/worker.mjs`: adaptador Supabase e endpoint autenticado.
- `tests/nexo-search-check.mjs`: unitários e integração com fixtures.
- `tests/nexo-search-worker-check.mjs`: integração do Worker.
- `package.json`: comandos de teste.
- `docs/nexo/PHASE_2_SEARCH_RANKING.md`: documentação e gate.

## 15. Migrations

Nenhuma migration foi criada ou aplicada.

Evolução futura, após reconciliação:

- RPC `search_nexo_beats`;
- índice parcial para beats publicados/públicos;
- índice por `user_id`, gênero, BPM e tonalidade;
- full-text ou trigram para título, descrição e taxonomia;
- agregação do menor preço de licença ativa.

Rollback conceitual: remover a função e os índices adicionados, sem alterar dados comerciais. Esta proposta não está pronta para produção enquanto não houver banco seguro de validação.

## 16. Testes

Resultados da validação final:

- `npm run test:nexo-search`: passou;
- `npm run test:nexo`: passou;
- `npm run test:recommendations`: passou;
- `npm run test:data-boundaries`: passou;
- `npm run test:player-controls`: passou;
- `npm run test:release-licenses`: passou;
- `npm run test:routes`: passou;
- `npm run build`: passou.

Os testes de busca cobrem validação, normalização, filtros, preço, BPM, licença, produtor, texto, elegibilidade, ranking, diversidade, zero-resultados, rate limit, três queries, JWT/RLS e ausência de dados privados.

## 17. Performance

No harness local do Worker:

- uma busca usa exatamente três chamadas REST;
- o lote é limitado a 120 candidatos;
- medições com fixture de um candidato ficaram abaixo de 15 ms no processo local;
- o payload devolve no máximo três resultados.

Limitações:

- não houve deploy nem medição de rede real;
- o catálogo remoto é pequeno;
- metas de 300 ms backend e uma segunda total continuam metas, não garantias.

## 18. Débitos técnicos

### Bloqueante para Fase 3

- reconciliar migrations;
- auditar RLS e funções remotas;
- corrigir associação de licença ativa ao beat publicado;
- obter ao menos um conjunto real recomendável para smoke de produção.

### Importante

- introduzir full-text/trigram após migration segura;
- consolidar taxonomia de subgênero e mood;
- popular métricas comportamentais confiáveis.

### Pode esperar

- cache;
- cursor/paginação;
- busca completa de profissionais e serviços;
- rate limit distribuído.

### Fora do escopo

- OpenAI;
- interpretação de linguagem natural;
- redesign;
- checkout e pagamentos;
- deploy.

## 19. Plano exato da Fase 3

1. Criar schema de intenção com Structured Outputs.
2. Usar OpenAI somente para converter linguagem natural em `NexoSearchRequest`.
3. Validar novamente a saída no backend.
4. Implementar tool calling fechado para `searchNexoEntities`.
5. Expor `POST /api/nexo/query`.
6. Manter `/api/nexo/search` como serviço determinístico.
7. Transformar matching reasons em texto curto sem alterar dados.
8. Testar prompt injection, filtros inválidos, não-invenção e autorização.
9. Não permitir SQL, URL, preço, licença ou permissão definidos pelo modelo.

## 20. Decisão final

```text
NO-GO PARA FASE 3
```

O motor local está implementado e testável, mas o banco remoto ainda não é uma base segura para a Fase 3: migrations divergem e o único beat publicado não possui licença ativa válida associada. Uma camada generativa conectada agora produziria zero resultados reais ou incentivaria fallbacks proibidos.
