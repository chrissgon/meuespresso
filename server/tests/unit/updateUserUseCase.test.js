"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import UpdateUserUseCase from "../../src/usecases/updateUserUseCase.js";

const sandbox = createSandbox();
const mocks = { validUser };

const userRepo = new InMemoryUserRepo();
const updateUserUseCase = new UpdateUserUseCase({ userRepo });

describe("UpdateUserUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return false because the user was not updated", async () => {
    const have = await updateUserUseCase.execute({});

    expect(have).to.be.false;
  });

  it("Should return true because the user was updated", async () => {
    const user = Object.create(mocks.validUser);

    sandbox
      .stub(updateUserUseCase.userRepo, updateUserUseCase.userRepo.updateByID.name)
      .resolves(true);

    const have = await updateUserUseCase.execute(user);

    expect(have).to.be.true
  });
});
