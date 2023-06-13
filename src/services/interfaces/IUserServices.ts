import IUser from "../../interfaces/IUser";
import { UUID } from "crypto";

export default interface IUserServices {
  getById(id: UUID): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  create(user: Omit<IUser, "id">): Promise<IUser>;
  delete(id: UUID): Promise<void>;
  update(id: UUID, user: Omit<IUser, "id">): Promise<IUser>;
  getUserAccessCount(id: UUID): Promise<IUser>;
}
