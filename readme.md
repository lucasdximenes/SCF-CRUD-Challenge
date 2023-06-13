# Este é um teste para desenvolvedores

# possui 5 testes

<details>
  <summary>Descrição do teste</summary>
  
  ## Introdução

Este projeto possui um banco de dados fake em fakeData.js com apenas um registro.
A ideia é melhorar e o CRUD escrito nos 4 arquivos de teste abaixo.

Será a validada a forma de escrita de código.
Escreva códigos que humanos consigam entender.

Fique a vontade para fazer modificaçoes nos serviços, comentários em código, estrutura, mas seja objetivo.

## teste1.js

GET em /user

Possuimos neste arquivo um serviço que faz uma busca no banco fake e retorna um registro.
Este código funciona, mas é possivel melhorar.
Veja o que pode deixar ele melhor escrito e mais performatico.

## teste2.js

POST em /users, descubra a intenção dele e o corrija.

## teste3.js

Este procura um usuário e o deleta da base.
Retorne sucesso para o client caso realmente tenha sido excluido e deixe o código mais performatico.

## teste4.js

Atualiza os dados de um usuário especifico.

## teste5.js

Retorne quantas vezes determinado usuário foi lido no teste1.

## teste 6

Definina uma forma de criar permissão para o usuario, defina se o usuário pode deletar ou atualizar usuários. Crie um middleware para validar essas permissões e adicione no teste4 e teste3.

</details>

## Como rodar o projeto

- Clone o projeto
- Instale as dependencias com `npm install`
- Rode o projeto com `npm run dev` para desenvolvimento ou `npm start`  para produção
- A API estará disponível em `http://localhost:3000`

## Como rodar os testes

- Rode os testes com `npm run test`

## Instruções para a avaliação da solução

Os arquivos da arquitetura anterior foram mantidos para que você possa comparar com a solução proposta.

- [oldSchema](./oldSchema/)

A arquitetura atual está dividida em:

- [src](./src/)
- [src/routes](./src/routes/) - Aqui estão as rotas da aplicação
- [src/middlewares](./src/middlewares/) - Aqui estão os middlewares da aplicação
- [src/controllers](./src/controllers/) - Aqui estão os controllers da aplicação (responsáveis por receber as requisições e enviar as respostas)
- [src/services](./src/services/) - Aqui estão os serviços da aplicação (responsáveis por fazer a lógica de negócio)
- [src/models](./src/models/) - Aqui estão os modelos da aplicação (responsáveis por fazer as operações no banco de dados)
- [src/database](./src/database/) - Aqui estão os arquivos de banco de dados da aplicação (Arquivos JSON - alterado de fakeData.js para fakeData.json pois um arquivo JSON é mais adequado para armazenar dados)

Cada arquivo tem sua documentação interna explicando sua responsabilidade e como funciona sua implementação comparado com a implementação anterior.

Essa mudança foi feita para que a solução fique mais organizada e escalável, seguindo os princípios do SOLID, TDD, POO e Clean Code.

Cada arquivo possui uma responsabilidade única, facilitando a manutenção e a escalabilidade da aplicação. Além disso, a aplicação foi dividida em camadas, facilitando a implementação de testes unitários e de integração. E também existe um injeção de dependências entre as camadas, facilitando a troca de implementação de cada camada seguindo por um contrato (interface) pré-definido.

por exemplo, se eu quiser trocar o banco de dados de JSON para MongoDB, basta criar um arquivo MongoDBModel que implemente a interface [IUserModel](./src/models/interfaces/IUserModel.ts) e alterar a injeção de dependência no arquivo de [routes](./src/routes/user.routes.ts).
