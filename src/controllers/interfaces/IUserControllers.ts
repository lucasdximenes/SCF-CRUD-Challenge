import { Request, Response } from "express";

export default interface IUserControllers {
  getById(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  getUserAccessCount(req: Request, res: Response): Promise<Response>;
}
