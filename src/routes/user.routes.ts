import { Router } from "express";
import UserModel from "../models/jsonModel/User.model";
import UserServices from "../services/user.services";
import UserControllers from "../controllers/user.controllers";

import UserMiddlewares from "../middlewares/user/users.middlewares";

export default class UserRoutes {
  public router: Router;
  private _userController: UserControllers;
  private _userServices: UserServices;
  private _userModel: UserModel;
  private _userMiddlewares: UserMiddlewares;

  constructor() {
    this.router = Router();
    this._userModel = new UserModel();
    this._userServices = new UserServices(this._userModel);
    this._userController = new UserControllers(this._userServices);
    this._userMiddlewares = new UserMiddlewares();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", this._userController.getAll);
    this.router.get("/:id", this._userController.getById);
    /* 
      Essa rota `/:id` que antes era so `/user` agora é `/:id`, pois
      estamos buscando por ID por ser um valor único e mais fácil de
      ser buscado. Além disso, o UUID é mais seguro contra ataques de
      força bruta (Ficar buscando por IDs sequenciais até encontrar um
      usuário).
    */

    this.router.post(
      "/",
      this._userMiddlewares.validateNewUser,
      this._userController.create
    );
    // Teste 2
    /* 
      Aqui nós adicionamos o middleware `validateNewUser` para validar
      os dados do usuário antes de criar o usuário. Ter certeza que o
      usuário tem todos os dados necessários para ser criado e que não
      tem nenhum dado a mais.
    */
  }
}
