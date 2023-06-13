import { badData } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { newUserSchema } from "./schemas/user.shema";

export default class UserMiddlewares {
  public async validateNewUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const newUser = newUserSchema.safeParse(req.body);

    if (!newUser.success) {
      throw badData(newUser.error.issues[0].message);
    }

    req.body = newUser.data;
    /* 
      Aqui nós estamos sobrescrevendo o body da requisição com o body validado.
      Isso é necessário pois o body da requisição pode acabar recebendo dados
      que não são esperados, e isso pode acabar causando problemas. Então, para
      evitar que isso aconteça, nós sobrescrevemos o body da requisição com o
      body validado.
    */

    next();
  }
}
