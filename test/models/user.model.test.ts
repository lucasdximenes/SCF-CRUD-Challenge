import * as chai from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import fs from "fs/promises";

chai.use(sinonChai);

import UserModel from "../../src/models/jsonModel/User.model";
import { userMock, usersMock } from "../mocks/models/user.mock";

/* 
  Seguindo uma abordagem de TDD, o teste deve ser escrito antes do código
  que será testado. Então, o primeiro passo é escrever o teste.
  O teste deve ser escrito de forma que ele falhe, pois se ele passar
  sem que o código seja escrito, não há garantia de que o teste está
  funcionando.
*/

describe("User Model", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Should return a user", async () => {
    sinon.stub(fs, "readFile").resolves(JSON.stringify(usersMock));

    const userModel = new UserModel();
    const user = await userModel.getById(userMock.id);

    chai.expect(user).to.be.deep.equal(userMock);
    // Testa se o usuário retornado é igual ao usuário mockado.
  });

  it("Should return all users", async () => {
    sinon.stub(fs, "readFile").resolves(JSON.stringify(usersMock));

    const userModel = new UserModel();
    const users = await userModel.getAll();

    chai.expect(users).to.be.deep.equal(usersMock);
    // Testa se os usuários retornados são iguais aos usuários mockados.
  });

  it("Should create a user", async () => {
    sinon.stub(fs, "readFile").resolves(JSON.stringify(usersMock));
    sinon.stub(fs, "writeFile").resolves();

    const userModel = new UserModel();
    const user = await userModel.create(userMock);

    chai.expect(user).to.be.deep.equal(userMock);
    // Testa se o usuário retornado é igual ao usuário mockado.
  });

  it("Should delete a user", async () => {
    sinon.stub(fs, "readFile").resolves(JSON.stringify(usersMock));
    sinon.stub(fs, "writeFile").resolves();

    const userModel = new UserModel();
    await userModel.delete(userMock.id);

    chai.expect(fs.writeFile).to.have.been.calledOnce;
    // Testa se o método writeFile foi chamado uma vez.
  });

  it("Should update a user", async () => {
    sinon.stub(fs, "readFile").resolves(JSON.stringify(usersMock));
    sinon.stub(fs, "writeFile").resolves();

    const userModel = new UserModel();
    const user = await userModel.update(userMock.id, userMock);

    chai.expect(user).to.be.deep.equal(userMock);
    // Testa se o usuário retornado é igual ao usuário mockado.
  });
});
