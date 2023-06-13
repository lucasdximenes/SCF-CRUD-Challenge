import IUserControllers from "./interfaces/IUserControllers";
import IUserServices from "../services/interfaces/IUserServices";
import { Request, Response } from "express";
import { UUID } from "crypto";

export default class UserControllers implements IUserControllers {
  private userServices: IUserServices;

  constructor(userServices: IUserServices) {
    this.userServices = userServices;
  }

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    /* 
      Aqui eu modifiquei para uma busca por ID ao invés de nome, pois
      o ID é único, e o nome não. Além disso, o ID é mais fácil de ser
      buscado, pois é um valor único e por ser UUID é mais seguro contra
      ataques de força bruta (Ficar buscando por IDs sequenciais até encontrar)
    */
    const user = await this.userServices.getById(id as UUID);
    return res.status(200).json(user);
  };

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const users = await this.userServices.getAll();
    return res.status(200).json(users);
  };
}
