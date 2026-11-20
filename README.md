# Saberes do Quilombo - Desenvolvido por DocumentaHistória

Plataforma API desenvolvida como Trabalho de Conclusão de Curso (TCC) e derivada do projeto interárea desenvolvida pela rede SESI de Camaçari. O site apresenta informações sobre os quilombos da região metropolitana de Salvador, com o objetivo de compartilhar os seus saberes e dar visibilidade a esses povos e as questões que enfrentam no dia a dia.

 ## Principais Endpoints:

 GET http://localhost:3000/api/quilombos/cards: 
 Mostra uma lista de cards dos quilombos disponíveis

 GET http://localhost:3000/api/quilombos/Quilombo da Cordoaria & GET http://localhost:3000/api/quilombos/Quilombo Quingoma:
 Mostra dados e informações dos respectivos quilombos procurados

 GET http://localhost:3000/api/fontes:
 Mostra as fontes utilizadas para a criação do site

 POST http://localhost:3000/api/usuarios/login: 
 Autentica o líder do quilombo cadastrado no site pelos administradores e retorna o token JWT

 POST http://localhost:3000/api/usuarios/cadastro:
 Cadastra um novo usuário(líder ou administrador) na plataforma (feito por administradores)

 POST http://localhost:3000/api/usuarios/relatos:
 Envia um relato feito por um líder cadastrado no site

 ## Tecnologias Utilizadas

 Front-end: HTML e CSS

 Back-end: Node.js e Express

 Banco de Dados: MongoDB & Mongoose

 Segurança & Autenticação: JSON Web Token (JWT), variáveis de ambiente (dotenv)

 Testes & Qualidade: Cypress, Jest, Thunder Client

## Estrutura de Pastas

T.C.C---Saberes-do-Quilombo/
├── .github/workflows/    # Pipelines de automação e deploy (GitHub Actions)
├── cypress/              # Testes End-to-End (E2E) com Cypress
├── docs/                 # Documentação complementar e collections do Thunder Client
├── images/               # Recursos visuais do projeto
├── src/                  # Código-fonte (controllers, models, routes, middlewares, views)
├── tests/                # Testes unitários e de integração
├── .env.example          # Modelo das variáveis de ambiente necessárias
├── app.js                # Configuração principal da aplicação Express
├── cypress.config.js     # Configurações do Cypress
├── package.json          # Dependências e scripts do projeto
├── ROTEIRO_TESTES.md     # Guia detalhado para execução dos testes
└── server.js             # Ponto de entrada e inicialização do servidor

## Como Executar o Projeto

## Pré requistos:

Node.js

MongoDB instalado localmente ou uma conta gratuita no MongoDB Atlas

Git

## Instalação & Configurações:

## 1. Clone o repositório:

git clone [https://github.com/moniquexavier-cloud/T.C.C---Saberes-do-Quilombo.git](https://github.com/moniquexavier-cloud/T.C.C---Saberes-do-Quilombo.git)
cd T.C.C---Saberes-do-Quilombo-main

## 2. Instale as dependências:

npm install

## 3. Inicie o servidor:

npm run dev








