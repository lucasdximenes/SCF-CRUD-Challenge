import { Request, Response, NextFunction } from "express";
import { boomify } from "@hapi/boom";
import ErrorHandlingMiddleware from "../../src/middlewares/error.middleware";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const { expect } = chai;

describe("ErrorHandlingMiddleware", () => {
  describe("handle", () => {
    let err: Error;
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let consoleErrorStub: sinon.SinonStub;

    beforeEach(() => {
      err = new Error("Test error");
      req = {} as Request;
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;
      next = sinon.stub() as unknown as NextFunction;
      consoleErrorStub = sinon.stub(console, "error");
    });

    afterEach(() => {
      consoleErrorStub.restore();
    });

    it("should handle a Boom error", () => {
      const boomError = boomify(err, { statusCode: 400 });
      ErrorHandlingMiddleware.handle(boomError, req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: "Test error" });
    });

    it("should handle a non-Boom error", () => {
      ErrorHandlingMiddleware.handle(err, req, res, next);
      expect(consoleErrorStub).to.have.been.calledWith(err);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({
        message: "An internal server error occurred",
      });
    });
  });
});
