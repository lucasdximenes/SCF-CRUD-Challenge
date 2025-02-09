import { UUID } from "crypto";
import IUser from "../../interfaces/IUser";

export default interface IUserModel {
  getById(id: UUID, withAccess: boolean): Promise<IUser | null>;
  getAll(withAccess: boolean): Promise<IUser[]>;
  create(user: Omit<IUser, "id">): Promise<IUser>;
  delete(id: UUID): Promise<void>;
  update(id: UUID, user: Omit<IUser, "id">): Promise<IUser>;
  getUserPermissions(id: UUID): Promise<string[]>;
}

/* 
  Definimos a interface IUserModel para que possamos definir o contrato que
  a classe UserModel deve seguir.

  Isso é útil pois caso precisemos alterar o banco de dados, podemos criar
  uma nova classe que implementa a interface IUserModel e alterar o arquivo
  src/models/user.model.ts para que ele utilize a nova classe.
*/
