# Saberes do Quilombo

Plataforma desenvolvida como Trabalho de Conclusão de Curso (TCC), derivada de um projeto interdisciplinar da rede SESI de Camaçari. O site reúne informações sobre comunidades quilombolas da Região Metropolitana de Salvador para compartilhar seus saberes, sua história e as questões que enfrentam.

## Funcionalidades

- Páginas públicas com cards e informações sobre os quilombos.
- Página de detalhes com referencial teórico, leis e informações sobre certificação quilombola.
- Busca no conteúdo do site.
- Área pública de relatos, com criação e edição de relatos por líderes autenticados.
- Gerenciamento de usuários por administradores.
- API REST com autenticação JWT e persistência em MongoDB.

## Tecnologias

- **Interface:** HTML, CSS, JavaScript e Bootstrap.
- **Servidor/API:** Node.js e Express.
- **Banco de dados:** MongoDB e Mongoose.
- **Validação:** Zod.
- **Autenticação:** JWT e bcrypt.
- **Testes:** Jest, Supertest e Cypress.

## Requisitos

- Node.js e npm.
- MongoDB local ou uma instância MongoDB Atlas.
- Git.

## Configuração e execução

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/moniquexavier-cloud/T.C.C---Saberes-do-Quilombo.git
   cd T.C.C---Saberes-do-Quilombo
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` a partir do modelo `.env.example`:

   ```powershell
   Copy-Item .env.example .env
   ```

   No macOS/Linux, use `cp .env.example .env`.

4. Configure as variáveis no `.env`:

   | Variável | Descrição |
   | --- | --- |
   | `MONGO_URI` | URI de conexão com o MongoDB. Substitua as credenciais e o banco de exemplo pelos valores da sua instância. |
   | `JWT_SECRET` | Segredo privado usado para assinar os tokens JWT. Defina um valor forte e mantenha-o fora do controle de versão. |
   | `PORT` | Porta HTTP da aplicação; o padrão é `3000`. |

5. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

   O servidor conecta ao MongoDB antes de começar a aceitar requisições. Com a configuração padrão, acesse <http://localhost:3000/>.

Para iniciar sem o reinício automático do Nodemon, use `npm start`.

## Páginas do site

Com o servidor em execução, estas páginas estão disponíveis:

- `/index.html` — página inicial e cards dos quilombos.
- `/conteudo1.html` e `/conteudo2.html` — conteúdo dos quilombos selecionados.
- `/detalhes.html` — referencial teórico, leis e certificação quilombola.
- `/resultados.html` — resultados da busca.
- `/login.html` — autenticação de usuários.
- `/relatos.html` — listagem e gerenciamento de relatos conforme o perfil autenticado.

## API

URL base local: `http://localhost:3000/api`

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/quilombos/cards` | Público | Lista os cards. Aceita o filtro opcional `?nome=...`. |
| `GET` | `/quilombos/:nome` | Público | Retorna as informações do quilombo pelo nome (busca sem diferenciar maiúsculas/minúsculas). |
| `GET` | `/fontes` | Público | Retorna `fontes`, `leis` e `certificacoes`, usados na página de detalhes. |
| `POST` | `/usuarios/login` | Público | Autentica o usuário e retorna um token JWT. |
| `GET` | `/usuarios` | Administrador | Lista usuários sem retornar suas senhas. |
| `POST` | `/usuarios/cadastro` | Administrador | Cadastra um usuário com perfil `LIDER` ou `ADMIN`. |
| `GET` | `/relatos` | Público | Lista os relatos. |
| `POST` | `/relatos` | Líder autenticado | Cria um relato para o quilombo associado ao líder. |
| `PATCH` | `/relatos/:id` | Autor líder | Edita o próprio relato. |
| `DELETE` | `/relatos/:id` | Autor líder ou administrador | Exclui o relato próprio; administradores podem excluir qualquer relato. |

Requisições autenticadas devem enviar o token no cabeçalho `Authorization: Bearer <token>`.

## Testes

- `npm test` — executa os testes de integração com Jest e Supertest. Os testes conectam ao MongoDB configurado em `MONGO_URI`.
- `npx cypress run` — executa os testes E2E. Inicie antes o servidor com `npm run dev`, em outro terminal.
- `npx cypress open` — abre a interface do Cypress; também requer o servidor em execução.

O roteiro adicional está em [`ROTEIRO_TESTES.md`](./ROTEIRO_TESTES.md).

## Estrutura do projeto

```text
.
├── .github/workflows/  # Automação do GitHub Actions
├── cypress/            # Testes end-to-end
├── docs/               # Documentação e coleção do Thunder Client
├── images/             # Imagens e ícones servidos pela aplicação
├── src/
│   ├── controllers/    # Lógica das rotas
│   ├── middleware/     # Autenticação e autorização
│   ├── models/         # Modelos e conexão com o MongoDB
│   ├── routes/         # Rotas da API
│   ├── schemas/        # Validação de requisições
│   └── view/           # Páginas, estilos e scripts do site
├── tests/              # Testes de integração
├── .env.example        # Modelo de configuração local
├── app.js              # Configuração do Express e montagem das rotas
├── server.js           # Conexão com o banco e inicialização do servidor
└── package.json        # Dependências e comandos do projeto
```

## Créditos

Desenvolvido por DocumentaHistória.
