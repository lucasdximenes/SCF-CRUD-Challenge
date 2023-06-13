import { Router } from "express";
import UserRoutes from "./user.routes";

export default class Routes {
  public router: Router;
  private _userRoutes: UserRoutes;

  constructor() {
    this.router = Router();
    this._userRoutes = new UserRoutes();

    this.router.use("/users", this._userRoutes.router);
  }
}
