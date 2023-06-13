import { Request, Response, NextFunction } from "express";
import IUserServices from "../services/interfaces/IUserServices";
import { unauthorized } from "@hapi/boom";
import { UUID } from "crypto";

export default class AuthMiddleware {
  private userServices: IUserServices;

  constructor(userServices: IUserServices) {
    this.userServices = userServices;
  }

  public verifyUpdatePermission = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    // Teste 6
    const { authorization } = req.headers;
    /* 
      Esse token vai vir do header da requisição, e é o id do usuário
      que está fazendo a requisição. Nesse momento, o token é o id do usuário
      porque é o que temos disponível. Mas, em um cenário real, o token seria
      um hash gerado a partir do id do usuário, e não o id do usuário em si.
      Como um JWT, por exemplo, que seria gerado em um login ou cadastro.
    */
    if (!authorization) throw unauthorized("Token not found");

    const permissions = await this.userServices.getUserPermissions(
      authorization as UUID
    );

    if (!permissions.includes("UPDATE")) throw unauthorized("Unauthorized");

    next();
  };

  public verifyDeletePermission = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    // Teste 6
    const { authorization } = req.headers;

    if (!authorization) throw unauthorized("Token not found");

    const permissions = await this.userServices.getUserPermissions(
      authorization as UUID
    );

    if (!permissions.includes("DELETE")) throw unauthorized("Unauthorized");

    next();
  };
}
