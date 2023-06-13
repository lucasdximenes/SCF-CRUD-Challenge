import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import UserServices from "../../src/services/user.services";
import IUserModel from "../../src/models/interfaces/IUserModel";
import { userMock, usersMock } from "../mocks/models/user.mock";
import { Boom, isBoom } from "@hapi/boom";

chai.use(sinonChai);
const { expect } = chai;

describe("UserServices", () => {
  beforeEach(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should getById() return a user", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    const user = await userServices.getById(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );

    expect(user).to.be.deep.equal(userMock);
  });

  it("should getById() throw an error if user is not found", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(null),
      getAll: sinon.stub().resolves(null),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    try {
      const response = await userServices.getById(
        "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
      );
      expect(response).to.be.null;
    } catch (err) {
      const boomErr = err as Boom;
      expect(isBoom(boomErr)).to.be.true;
      expect(boomErr.output.statusCode).to.be.equal(404);
    }
  });

  it("should getAll() return an array of users", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    const users = await userServices.getAll();

    expect(users).to.be.deep.equal(usersMock);
  });

  it("should create() return a user", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(userMock),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    const user = await userServices.create(userMock);

    expect(user).to.be.deep.equal(userMock);
  });

  it("should delete() delete a user", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    await userServices.delete(userMock.id);

    expect(userModelMock.delete).to.have.been.calledWith(userMock.id);
    expect(userModelMock.delete).to.have.been.calledOnce;
  });

  it("should delete() throw an error if user is not found", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(null),
      getAll: sinon.stub().resolves(null),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    try {
      await userServices.delete("e2d3286f-2d8f-471a-bacb-1e5d28d8727e");
    } catch (err) {
      const boomErr = err as Boom;
      expect(isBoom(boomErr)).to.be.true;
      expect(boomErr.output.statusCode).to.be.equal(404);
    }
  });

  it("should update() update a user", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(userMock),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    const user = await userServices.update(userMock.id, userMock);

    expect(user).to.be.deep.equal(userMock);
  });

  it("should update() throw an error if user is not found", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(null),
      getAll: sinon.stub().resolves(null),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    try {
      await userServices.update(
        "e2d3286f-2d8f-471a-bacb-1e5d28d8727e",
        userMock
      );
    } catch (err) {
      const boomErr = err as Boom;
      expect(isBoom(boomErr)).to.be.true;
      expect(boomErr.output.statusCode).to.be.equal(404);
    }
  });

  it("should getUserAccessCount() return a user with access count", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    const user = await userServices.getUserAccessCount(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );

    expect(user).to.be.deep.equal({ ...userMock, accessCount: 0 });
  });

  it("should getUserPermissions() return a user permissions", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(["delete", "update"]),
    };

    const userServices = new UserServices(userModelMock);

    const permissions = await userServices.getUserPermissions(userMock.id);

    expect(permissions).to.be.deep.equal(["delete", "update"]);
  });

  it("should getUserPermissions() throw an error if user is not found", async () => {
    const userModelMock: IUserModel = {
      getById: sinon.stub().resolves(null),
      getAll: sinon.stub().resolves(null),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserPermissions: sinon.stub().resolves(),
    };

    const userServices = new UserServices(userModelMock);

    try {
      await userServices.getUserPermissions(
        "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
      );
    } catch (err) {
      const boomErr = err as Boom;
      expect(isBoom(boomErr)).to.be.true;
      expect(boomErr.output.statusCode).to.be.equal(404);
    }
  });
});
