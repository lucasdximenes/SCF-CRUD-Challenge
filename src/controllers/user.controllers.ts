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
    const user = await this.userServices.getById(id as UUID);
    return res.status(200).json(user);
  };

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const users = await this.userServices.getAll();
    return res.status(200).json(users);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.userServices.create(req.body);
    return res.status(201).json(user);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.userServices.delete(id as UUID);
    return res.status(200).json({ message: "Successfully deleted" });
  };
}
