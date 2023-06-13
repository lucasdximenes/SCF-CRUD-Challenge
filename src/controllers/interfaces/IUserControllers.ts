import { Request, Response } from "express";

export default interface IUserControllers {
  getById(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}
