"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";

import RemoveFromCartUseCase from "../../src/usecases/removeFromCartUseCase.js";

const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
};

const userRepo = new InMemoryUserRepo();
const removeFromCartUseCase = new RemoveFromCartUseCase({ userRepo });

describe("RemoveFromCartUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return false because the product doesnt exists", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        removeFromCartUseCase.userRepo,
        removeFromCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(false);

    const have = await removeFromCartUseCase.execute({ userID, productID });

    expect(have).to.be.false;
  });

  it("Should return false because the product was not removed", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        removeFromCartUseCase.userRepo,
        removeFromCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(true);
    sandbox
      .stub(
        removeFromCartUseCase.userRepo,
        removeFromCartUseCase.userRepo.removeFromCart.name
      )
      .resolves(false);

    const have = await removeFromCartUseCase.execute({ userID, productID });

    expect(have).to.be.false;
  });

  it("Should return true because the product has been removed", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        removeFromCartUseCase.userRepo,
        removeFromCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(true);
    sandbox
      .stub(
        removeFromCartUseCase.userRepo,
        removeFromCartUseCase.userRepo.removeFromCart.name
      )
      .resolves(true);

    const have = await removeFromCartUseCase.execute({ userID, productID });

    expect(have).to.be.true;
  });
});
