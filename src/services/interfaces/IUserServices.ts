import IUser from "../../interfaces/IUser";

export default interface IUserServices {
  getById(id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
