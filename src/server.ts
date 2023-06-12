import app from "./app";
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/* 
  Aqui, estamos separando a criação do servidor do arquivo app.ts.

  Isso é útil para testes, pois podemos importar o app em um arquivo de teste e
  não precisamos iniciar o servidor para testar o app. 
  
  Também é útil para quando precisamos iniciar o servidor em um arquivo
  diferente do app.ts, como em um arquivo de migração.
*/

export default server;
