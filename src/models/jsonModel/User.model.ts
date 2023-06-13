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
  public async getById(id: UUID): Promise<IUser | null> {
    const users = await this.getAll();
    const user = users.find((user) => user.id === id);
    /* 
      Aqui a abordagem é utilizar o método find() do JavaScript para encontrar
      o usuário com o id especificado. Ao invés de utilizar um for loop.
      Isso faz com que o código fique mais legível e mais fácil de entender.
    */

    return user || null;
  }

  // Teste 1
  public async getAll(): Promise<IUser[]> {
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

    return JSON.parse(users);
  }

  // Teste 2
  public async create(newUser: Omit<IUser, "id">): Promise<IUser> {
    const users = await this.getAll();
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
}
