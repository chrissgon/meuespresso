"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import GetUserUseCase from "../../src/usecases/getUserUseCase.js";

const sandbox = createSandbox();
const mocks = { validUser };

const userRepo = new InMemoryUserRepo();
const getUserUseCase = new GetUserUseCase({ userRepo });

describe("GetUserUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return false because the userID is invalid", async () => {
    const have = await getUserUseCase.execute({});

    expect(have).to.be.false;
  });

  it("Should return an user because the userID is valid", async () => {
    const user = { ...mocks.validUser };

    sandbox
      .stub(getUserUseCase.userRepo, getUserUseCase.userRepo.getByID.name)
      .resolves(user);

    const have = await getUserUseCase.execute(user);

    expect(have).to.be.deep.equal(user);
  });
});
