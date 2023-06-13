import IUser from "../../interfaces/IUser";
import { UUID } from "crypto";

export default interface IUserServices {
  getById(id: UUID): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
