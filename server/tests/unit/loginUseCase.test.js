"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import LoginUseCase from "../../src/usecases/loginUseCase.js";

const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
};

const userRepo = new InMemoryUserRepo();
const loginUseCase = new LoginUseCase({ userRepo });

describe("LoginUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return false because the credentials is invalid", async () => {
    const user = Object.create(mocks.validUser);

    sandbox
      .stub(loginUseCase.userRepo, loginUseCase.userRepo.login.name)
      .resolves(undefined);

    const have = await loginUseCase.execute(user);

    expect(have).to.be.false;
  });

  it("Should return an user because the credentials is valid", async () => {
    const user = Object.create(mocks.validUser);

    sandbox
      .stub(loginUseCase.userRepo, loginUseCase.userRepo.login.name)
      .resolves(user);

    const have = await loginUseCase.execute(user);

    expect(have).to.be.deep.equal(user);
  });
});
