import { Router } from "express";
import UserModel from "../models/jsonModel/User.model";
import UserServices from "../services/user.services";
import UserControllers from "../controllers/user.controllers";

export default class UserRoutes {
  public router: Router;
  private _userController: UserControllers;
  private _userServices: UserServices;
  private _userModel: UserModel;

  constructor() {
    this.router = Router();
    this._userModel = new UserModel();
    this._userServices = new UserServices(this._userModel);
    this._userController = new UserControllers(this._userServices);
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", this._userController.getAll);
    this.router.get("/:id", this._userController.getById);
    /* 
      Essa rota `/:id` que antes era so `/user` agora é `/:id`, pois
      estamos buscando por ID por ser um valor único e mais fácil de
      ser buscado. Além disso, o ID é mais seguro contra ataques de
      força bruta (Ficar buscando por IDs sequenciais até encontrar um
      usuário).
    */
  }
}
