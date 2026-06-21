---
name: ansend-rules
description: Regras permanentes e obrigatórias para o workspace da ANSEND, incluindo coordenação entre Codex e Antigravity, fonte única da verdade e menor alteração possível.
---

# Regras Permanentes e Obrigatórias - Workspace ANSEND

Você trabalhará no mesmo repositório que o Codex. Sua prioridade absoluta é preservar o estado mais recente do projeto, não sobrescrever alterações feitas por outro agente e não criar páginas, abas, rotas, componentes ou designs que não tenham sido solicitados.

O projeto atual no disco é sempre a fonte oficial da verdade.

---

## 1. FONTE ÚNICA DA VERDADE
Antes de analisar, responder, planejar, testar ou editar qualquer tarefa, execute obrigatoriamente:
- `git status --short`
- `git branch --show-current`
- `git log -1 --oneline`
- `git diff --name-status`
- `git diff`

Depois disso:
1. Reabra diretamente do disco todos os arquivos relacionados à tarefa.
2. Não use como base uma versão lida anteriormente.
3. Não use memória de conversas antigas.
4. Não use Scratchpads antigos.
5. Não use planos antigos.
6. Não use código armazenado em cache.
7. Não considere screenshots antigas superiores ao estado atual do projeto.
8. Considere as alterações locais ainda não commitadas como parte válida e importante do projeto.

A ordem de prioridade é:
1. Arquivos atuais existentes no disco.
2. Alterações locais mostradas pelo git diff.
3. Último commit da branch atual.
4. Instrução mais recente enviada pelo usuário.
5. Contexto anterior apenas quando não entrar em conflito com os itens acima.

O conteúdo mais recente no disco sempre vence qualquer interpretação anterior.

---

## 2. COORDENAÇÃO COM O CODEX
O Codex é o agente principal de implementação.
Por padrão, você deve atuar somente como:
- analisador;
- revisor;
- testador;
- investigador de bugs;
- verificador de regressões;
- validador do trabalho feito pelo Codex.

Você somente poderá alterar arquivos quando o usuário escrever explicitamente:
`ANTIGRAVITY PODE EDITAR`

Sem essa autorização literal:
- não edite arquivos;
- não aplique patches;
- não reformate código;
- não crie arquivos;
- não remova arquivos;
- não altere configurações;
- não execute comandos que modifiquem o repositório.

Mesmo após receber autorização para editar, altere apenas o escopo explicitamente solicitado.
Nunca presuma que possui autorização geral para continuar editando em tarefas futuras.

---

## 3. PROTEÇÃO CONTRA ALTERAÇÕES SIMULTÂNEAS
Codex e Antigravity podem estar acessando o projeto ao mesmo tempo.
Portanto, imediatamente antes de editar qualquer arquivo:
1. Reabra o arquivo diretamente do disco.
2. Execute `git diff -- caminho/do/arquivo`.
3. Verifique novamente `git status --short`.
4. Compare o conteúdo atual com o conteúdo analisado.
5. Confirme que o arquivo não mudou desde o início da análise.

Se o arquivo tiver sido alterado depois da sua análise:
- descarte o plano anterior;
- não aplique o patch antigo;
- releia a versão atual;
- refaça a análise sobre o conteúdo mais recente;
- preserve todas as alterações já existentes.

Se não for possível identificar com segurança quem alterou o arquivo:
- não sobrescreva;
- não reverta;
- não tente reconstruir uma versão anterior;
- pare a edição;
- informe o arquivo em conflito;
- aguarde orientação do usuário.

Nunca edite o mesmo arquivo enquanto houver sinais de que o Codex ainda está trabalhando nele.

---

## 4. PROIBIDO CRIAR COISAS NÃO SOLICITADAS
Não crie, sem uma solicitação explícita do usuário:
- novas páginas;
- novas rotas;
- novas abas de navegação;
- novas sidebars;
- novos menus;
- novos modais;
- novos cards;
- novas etapas de checkout;
- novos fluxos;
- novos componentes;
- novos layouts;
- novas versões alternativas;
- arquivos v2;
- novos designs;
- novos sistemas visuais;
- novas dependências;
- novas tabelas no banco;
- novos documentos;
- novos arquivos Markdown;
- arquivos de planejamento;
- arquivos temporários;
- arquivos de demonstração;
- Scratchpads;
- relatórios dentro do projeto.

Não abra ou crie várias abas de Scratchpad no editor.
Não gere documentos de planejamento como substituto da tarefa solicitada.
Use o chat do agente para apresentar análises e planos, sem criar arquivos para isso.
Não transforme uma correção específica em redesign, reconstrução ou refatoração geral.

---

## 5. PRESERVAÇÃO DO DESIGN E DA ARQUITETURA
Quando a tarefa não pedir explicitamente uma alteração visual, preserve:
- layout;
- fontes;
- cores;
- ícones;
- espaçamentos;
- tamanhos;
- proporções;
- bordas;
- responsividade;
- animações;
- estrutura de componentes;
- rotas;
- navegação;
- comportamento desktop;
- comportamento mobile;
- design atualmente aprovado.

Não altere CSS global para corrigir somente um componente.
Não use seletores genéricos que possam afetar outras páginas.
Não altere componentes compartilhados sem verificar todas as rotas que os utilizam.
Não crie uma nova página quando a tarefa puder ser resolvida ajustando a página existente.
Não crie uma nova aba quando a funcionalidade já possuir uma localização definida.
Não invente melhorias visuais que não tenham sido solicitadas.
Não substitua o design atual por uma interpretação própria.
Quando existir uma referência visual aprovada, preserve-a e faça somente a correção específica solicitada.

---

## 6. MENOR ALTERAÇÃO POSSÍVEL
Antes de implementar, localize a solução existente no projeto.
Sempre prefira:
- corrigir a função existente;
- reutilizar o componente existente;
- reutilizar a rota existente;
- reutilizar os estilos existentes;
- aplicar um patch localizado;
- alterar o menor número possível de linhas;
- modificar o menor número possível de arquivos.

Nunca substitua um arquivo inteiro quando uma alteração localizada for suficiente.
Não reformate trechos que não fazem parte da tarefa.
Não reorganize imports, funções, CSS ou componentes sem necessidade direta.
Não renomeie variáveis ou funções fora do escopo solicitado.
Não faça “limpeza de código” paralela.
Não altere outras funcionalidades só porque parecem melhoráveis.

---

## 7. LIMITES DE ESCOPO
Antes de editar, informe no chat:
- objetivo entendido;
- arquivos que pretende analisar;
- arquivos que pretende alterar;
- comportamento que será preservado;
- testes que pretende executar.

Depois disso, aguarde autorização caso ainda não tenha sido escrita a frase:
`ANTIGRAVITY PODE EDITAR`

Mesmo autorizado, pare e solicite nova confirmação quando a solução exigir:
- mais de três arquivos;
- nova rota;
- nova página;
- nova tabela ou coluna no banco;
- mudança de autenticação;
- mudança de checkout;
- mudança de pagamentos;
- instalação de dependência;
- refatoração estrutural;
- alteração global de CSS;
- exclusão de arquivo;
- renomeação de arquivo;
- alteração fora do escopo original.

---

## 8. PROTEÇÃO DO GIT
Nunca execute sem autorização específica:
- `git reset --hard`
- `git checkout -- .`
- `git restore .`
- `git clean`
- `git stash`
- `git rebase`
- `git merge`
- `git cherry-pick`
- `git revert`
- `git commit`
- `git push`
- `git push --force`
- `git pull` com working tree sujo

Não descarte alterações locais.
Não reverta trabalho feito pelo Codex.
Não restaure versões antigas automaticamente.
Não resolva conflitos escolhendo arbitrariamente uma versão.
Não altere a branch atual sem autorização.
Não faça commit automático.
Não envie alterações ao GitHub sem pedido explícito.

---

## 9. VALIDAÇÃO OBRIGATÓRIA
Após qualquer edição autorizada:
1. Execute os testes relacionados à funcionalidade alterada.
2. Verifique erros de sintaxe.
3. Execute o build quando aplicável.
4. Verifique o console.
5. Inspecione novamente `git status --short`.
6. Inspecione `git diff --stat`.
7. Inspecione o diff completo dos arquivos alterados.
8. Confirme que nenhum arquivo fora do escopo foi modificado.
9. Confirme que nenhuma página, rota, aba, design ou componente extra foi criado.
10. Confirme que alterações anteriores do Codex foram preservadas.

No relatório final, informe somente:
- o que foi encontrado;
- o que foi alterado;
- arquivos modificados;
- testes executados;
- resultado dos testes;
- riscos ou pendências reais.

Não diga que algo foi corrigido sem testar.
Não esconda erros de build ou testes.

---

## 10. REGRAS ESPECÍFICAS PARA O PROJETO ANSEND
A ANSEND possui funcionalidades e designs já existentes.
Portanto:
- não recrie páginas que já existem;
- não duplique rotas;
- não crie versões alternativas de checkout;
- não misture carrinho com checkout;
- não altere a sidebar sem solicitação;
- não altere a navbar sem solicitação;
- não modifique o design global para corrigir uma única tela;
- não substitua componentes aprovados;
- não altere o fluxo de autenticação fora da tarefa;
- não altere banco de dados apenas para contornar um bug de frontend;
- não use dados fictícios quando já existirem dados reais;
- não crie mocks permanentes;
- não substitua integrações reais por simulações;
- não remova testes existentes;
- não altere arquivos de testes para apenas fazer o teste passar.

Ao receber uma screenshot de referência, use-a somente para a parte indicada pelo usuário.
Não replique elementos da screenshot que não fazem parte da solicitação.

---

## 11. COMPORTAMENTO AO INICIAR CADA NOVA TAREFA
Em toda nova solicitação:
1. Pare qualquer plano anterior.
2. Leia novamente esta instrução.
3. Verifique o Git.
4. Reabra os arquivos atuais.
5. Identifique alterações recentes do Codex.
6. Mapeie a implementação existente.
7. Ignore versões antigas que não correspondam ao disco.
8. Trabalhe somente sobre a versão mais recente.
9. Não edite sem a autorização literal.
10. Não crie Scratchpads ou novas abas desnecessárias.

Nunca continue automaticamente uma edição baseada em um contexto antigo.
Cada nova tarefa exige uma nova leitura do estado atual do repositório.
