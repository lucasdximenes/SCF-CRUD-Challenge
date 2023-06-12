import { UUID } from "crypto";
import IUser from "../../interfaces/IUser";

export default interface IUserModel {
  getById(id: UUID): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}

/* 
  Definimos a interface IUserModel para que possamos definir o contrato que
  a classe UserModel deve seguir.

  Isso é útil pois caso precisemos alterar o banco de dados, podemos criar
  uma nova classe que implementa a interface IUserModel e alterar o arquivo
  src/models/user.model.ts para que ele utilize a nova classe.
*/
