import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import UserControllers from "../../src/controllers/user.controllers";
import IUserServices from "../../src/services/interfaces/IUserServices";
import { userMock, usersMock } from "../mocks/models/user.mock";
import { Request, Response } from "express";

chai.use(sinonChai);
const { expect } = chai;

describe("UserControllers", () => {
  beforeEach(() => {
    sinon.restore();
  });
  afterEach(() => {
    sinon.restore();
  });

  it("should getById() return a user with status 200", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserAccessCount: sinon.stub().resolves(),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {
      params: {
        id: "e2d3286f-2d8f-471a-bacb-1e5d28d8727e",
      },
    } as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.getById(req, res);

    expect(userServicesMock.getById).to.have.been.calledWith(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(userMock);
  });

  it("should getAll() return an array of users with status 200", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(userMock),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserAccessCount: sinon.stub().resolves(),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {} as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.getAll(req, res);

    expect(userServicesMock.getAll).to.have.been.called;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(usersMock);
  });

  it("should create() return a user with status 201", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(userMock),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserAccessCount: sinon.stub().resolves(),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {
      body: userMock,
    } as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.create(req, res);

    expect(userServicesMock.create).to.have.been.calledWith(userMock);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(userMock);
  });

  it("should delete() return status 200 and message 'Successfully deleted'", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserAccessCount: sinon.stub().resolves(),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {
      params: {
        id: "e2d3286f-2d8f-471a-bacb-1e5d28d8727e",
      },
    } as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.delete(req, res);

    expect(userServicesMock.delete).to.have.been.calledWith(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      message: "Successfully deleted",
    });
  });

  it("should update() return status 200 and updated user", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(userMock),
      getUserAccessCount: sinon.stub().resolves(),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {
      params: {
        id: "e2d3286f-2d8f-471a-bacb-1e5d28d8727e",
      },
    } as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.update(req, res);

    expect(userServicesMock.update).to.have.been.calledWith(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(userMock);
  });

  it("should getUserAccessCount() return status 200 and user access count", async () => {
    const userServicesMock: IUserServices = {
      getById: sinon.stub().resolves(),
      getAll: sinon.stub().resolves(usersMock),
      create: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      update: sinon.stub().resolves(),
      getUserAccessCount: sinon.stub().resolves({
        ...userMock,
        accessCount: 5,
      }),
    };

    const userControllers = new UserControllers(userServicesMock);

    const req = {
      params: {
        id: "e2d3286f-2d8f-471a-bacb-1e5d28d8727e",
      },
    } as unknown as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await userControllers.getUserAccessCount(req, res);

    expect(userServicesMock.getUserAccessCount).to.have.been.calledWith(
      "e2d3286f-2d8f-471a-bacb-1e5d28d8727e"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      message: `User ${userMock.name} has accessed ${5} times`,
    });
  });
});
