import IUserModel from "../interfaces/IUserModel";
import IUser from "../../interfaces/IUser";
import { UUID, randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const jsonDatabasePath = path.resolve(
  __dirname,
  "..",
  "..",
  "database",
  "fakeData.json"
);

export default class UserModel implements IUserModel {
  // Teste 1
  public async getById(id: UUID, withAccess: boolean): Promise<IUser | null> {
    const users = await this.getAll(withAccess);
    const user = users.find((user) => user.id === id);
    /* 
      Aqui a abordagem é utilizar o método find() do JavaScript para encontrar
      o usuário com o id especificado. Ao invés de utilizar um for loop.
      Isso faz com que o código fique mais legível e mais fácil de entender.
    */

    return user || null;
  }

  // Teste 1
  public async getAll(withAccess: boolean): Promise<IUser[]> {
    const users = await fs.readFile(jsonDatabasePath, "utf-8");
    /* 
      Aqui eu mudei o arquivo 'fakeData.js' para 'fakeData.json' pois o
      arquivo .json é um arquivo em que podemos armazenar dados no formato
      JSON, que é um formato de dados muito utilizado em APIs.
      Além disso, o Node.js já possui um módulo nativo para trabalhar com
      arquivos JSON, o módulo 'fs/promises'.
      E com o arquivo .json nós podemos manter os dados persistidos mesmo
      após o servidor ser desligado.
    */
    if (!withAccess) return JSON.parse(users);

    return JSON.parse(users).map(({ accessCount, ...user }: IUser) => ({
      ...user,
    }));
  }

  // Teste 2
  public async create(newUser: Omit<IUser, "id">): Promise<IUser> {
    const users = await this.getAll(false);
    const user: IUser = {
      id: randomUUID(),
      /* 
        A responsabilidade de gerar o ID não é do serviço, e sim do modelo de
        usuário. Pois o modelo de usuário é quem sabe como criar um usuário em
        determinado banco de dados.
      */
      ...newUser,
    };

    users.push(user);

    await fs.writeFile(jsonDatabasePath, JSON.stringify(users));
    /* 
      Aqui nós utilizamos o método writeFile() do módulo 'fs/promises' para
      escrever os dados no arquivo fakeData.json.
    */

    return user;
  }

  // Teste 3
  public async delete(id: UUID): Promise<void> {
    const users = await this.getAll(false);
    const filteredUsers = users.filter((user) => user.id !== id);
    /* 
      Aqui nós utilizamos o método filter() do JavaScript para filtrar os
      usuários que não tem o ID especificado. Ao invés de utilizar um for loop.
      Isso faz com que o código fique mais legível e mais fácil de entender.
    */

    await fs.writeFile(jsonDatabasePath, JSON.stringify(filteredUsers));
    /* 
      Aqui nós utilizamos o método writeFile() do módulo 'fs/promises' para
      escrever os dados no arquivo fakeData.json.
    */
  }

  // Teste 4
  public async update(
    id: UUID,
    updatedUser: Omit<IUser, "id">
  ): Promise<IUser> {
    const users = await this.getAll(true);
    const userIndex = users.findIndex((user) => user.id === id);
    /* 
      Aqui nós utilizamos o método findIndex() do JavaScript para encontrar o
      índice do usuário com o id especificado. Ao invés de utilizar um for loop.
      Isso faz com que o código fique mais legível e mais fácil de entender.
    */

    const user: IUser = {
      id,
      name: updatedUser.name || users[userIndex].name,
      job: updatedUser.job || users[userIndex].job,
      accessCount: updatedUser.accessCount || users[userIndex].accessCount,
    };

    users[userIndex] = user;

    await fs.writeFile(jsonDatabasePath, JSON.stringify(users));
    /* 
      Aqui nós utilizamos o método writeFile() do módulo 'fs/promises' para
      escrever os dados no arquivo fakeData.json.
    */

    return user;
  }
}
