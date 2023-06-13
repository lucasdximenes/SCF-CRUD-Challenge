import IUserServices from "./interfaces/IUserServices";
import IUserModel from "../models/interfaces/IUserModel";
import IUser from "../interfaces/IUser";
import { UUID } from "crypto";
import { notFound } from "@hapi/boom";

export default class UserServices implements IUserServices {
  private userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this.userModel = userModel;
  }

  public async getById(id: UUID): Promise<IUser | null> {
    const user = await this.userModel.getById(id);

    if (!user) throw notFound("User not found");
    /* 
      Caso o usuário não seja encontrado, o método getById() irá retornar
      null, e então nós iremos lançar um erro 404 utilizando o pacote Boom.
    */

    return user; // Caso o usuário seja encontrado, nós retornamos o usuário.
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userModel.getAll();

    return users; // Independente de ter usuários ou não, nós retornamos um array.
  }

  public async create(user: Omit<IUser, "id">): Promise<IUser> {
    const newUser = await this.userModel.create(user);

    return newUser;
  }

  public async delete(id: UUID): Promise<void> {
    const user = await this.userModel.getById(id);

    if (!user) throw notFound("User not found");
    /* 
      Aqui nós verificamos se o usuário existe, caso não exista, nós
      lançamos um erro 404 utilizando o pacote Boom. É interessante
      essa verificação pois caso o usuário não exista, nós não iremos
      deletar nada do banco de dados.
    */

    await this.userModel.delete(id);
  }

  public async update(
    id: UUID,
    updatedUser: Omit<IUser, "id">
  ): Promise<IUser> {
    const user = await this.userModel.getById(id);

    if (!user) throw notFound("User not found");

    const newUser = await this.userModel.update(id, updatedUser);

    return newUser;
  }
}
