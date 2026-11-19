# Roteiro de Testes — API Saberes do Quilombo

Este documento apresenta o planejamento e os casos de teste manuais e automatizados da API **Saberes do Quilombo**

## 1. Testes Manuais de API (Thunder Client)

**URL Base:** `http://localhost:3000/api` **
**Comando de Execução:** `npm run dev`

## Casos de Sucesso: 

Caso teste 1: Listagem de Informações sobre os Cards

Entrada: Banco de dados conectado e servidor em funcionamento

Ação: http://localhost:3000/api/quilombos/Quilombo da Cordoaria

Resultado: Mostrar lista das informações do quilombo da Cordoaria status 200 OK


## Caso teste 2: Listagem de Informações sobre o Quilombo

Entrada: Banco de dados conectado e servidor em funcionamento

Ação: http://localhost:3000/api/quilombos/Quilombo da Cordoaria

Resultado: Mostrar lista das informações do quilombo da Cordoaria status 200 OK

## Caso teste 3: Login do líder do quilombo na página de relatos

Entrada: Banco de dados conectado e servidor em funcionamento com um email e senha válido em JSON

Ação: http://localhost:3000/api/usuarios/login

Resultado: Mostrar mensagem de login realizada com o token 200 OK


## Casos de Erro: 

## Caso teste 4: Login Falho do líder do quilombo na página de relatos

Entrada: Banco de dados conectado e servidor em funcionamento com um email e senha inválido em JSON

Ação: http://localhost:3000/api/usuarios/login

Resultado: Não permite o login e mostrar mensagem de erro 401 Unauthorized

## Caso teste 5: Negar mostrar lista de usuários sem o token necessário

Entrada: Banco de dados conectado e servidor em funcionamento sem token

Ação: http://localhost:3000/api/usuarios

Resultado: Não permite mostrar a lista de usuários e mostrar mensagem de erro 401 Unauthorized

## 2. Testes Automatizados de Integração (Jest + Supertest)

**Arquivo de Teste:** `tests/api.test.js` *(ajuste o caminho se o nome do arquivo for diferente)*  
**Comando de Execução:** `npm test`

## Caso teste 1: Bloquear listagem de usuários sem token de autenticação

Entrada: Banco de dados conectado e requisição sem cabeçalho Authorization (token JWT ausente)

Ação: Requisição GET para `/api/usuarios`

Resultado: Não permite mostrar a lista de usuários e retorna status HTTP 401 (Não Autorizado)

## Caso teste 2: Recusar login com senha incorreta

Entrada: Banco de dados conectado com um JSON contendo e-mail (`exemplo@gmail.com`) e senha incorreta (`senha_errada`)

Ação: Requisição POST para `/api/usuarios/login`

Resultado: Não permite o login e retorna status HTTP 400 ou 401

## Caso teste 3: Listagem pública dos relatos cadastrados

Entrada: Banco de dados conectado (sem necessidade de envio de token ou parâmetros)

Ação: Requisição GET para `/api/relatos`

Resultado: Retorna status HTTP 200 (OK) e lista os relatos no formato de array

## Caso teste 4: Bloquear criação de relato sem token JWT

Entrada: Banco de dados conectado com um JSON contendo `quilombo_id` e `texto`, mas sem o token JWT no cabeçalho

Ação: Requisição POST para `/api/relatos`

Resultado: Impede o cadastro do relato e retorna status HTTP 401 (Não Autorizado)


## 3. Testes End-to-End / E2E (Cypress)

**Arquivo de Teste:** `cypress/e2e/spec.cy.js` *(ajuste o caminho conforme o nome do seu arquivo)*  
**Comando de Execução:** `npx cypress run` (ou `npx cypress open`)

## Caso teste 1: Carregamento da página inicial e área de quilombos

Entrada: Servidor em funcionamento e acesso à página inicial (`http://localhost:3000/index.html`)

Ação: Abrir a página inicial no navegador automatizado

Resultado: Carregar a página corretamente e exibir o elemento container da lista de quilombos (`#lista-quilombos`)

## Caso teste 2: Exibição de mensagem de erro ao falhar no login

Entrada: Servidor em funcionamento, acesso à página de login (`http://localhost:3000/login.html`) e preenchimento com e-mail (`teste_errado@gmail.com`) e senha inválidos (`123456`)

Ação: Preencher os campos `#usuario` e `#senha` e submeter o formulário `#form-login`

Resultado: Impedir o login e exibir uma mensagem de erro visível na área de feedback (`#feedback-login`)




