import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";

const app = express();
/* 
  Aqui nós temos o app separado do servidor.

  Além de ser útil para testes, podemos definir melhor e separar as responsabilidades
  do app e do servidor.

  o app é responsável por definir as rotas, middlewares, configurações, etc.
  o servidor é responsável por iniciar o app e escutar as requisições.
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response): void => {
  res.send("SCF - CRUD Challenge");
});

export default app;
