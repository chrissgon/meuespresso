"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import InMemoryProductRepo from "../../src/interfaces/repositories/memory/inMemoryProductRepo.js";

import AddToCartUseCase from "../../src/usecases/addToCartUseCase.js";

const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
};

const userRepo = new InMemoryUserRepo();
const productRepo = new InMemoryProductRepo();
const addToCartUseCase = new AddToCartUseCase({
  userRepo,
  productRepo,
});

describe("AddToCartUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return false because the product exists in the cart", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        addToCartUseCase.userRepo,
        addToCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(true);

    const have = await addToCartUseCase.execute({
      userID,
      productID,
      quantity: 2,
    });

    expect(have).to.be.false;
  });

  it("Should return false because the product was not found", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        addToCartUseCase.userRepo,
        addToCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(false);

    sandbox
      .stub(
        addToCartUseCase.productRepo,
        addToCartUseCase.productRepo.getByID.name
      )
      .resolves(undefined);

    const have = await addToCartUseCase.execute({
      userID,
      productID,
      quantity: 2,
    });

    expect(have).to.be.false;
  });

  it("Should return false because the product was not added", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        addToCartUseCase.userRepo,
        addToCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(false);

    sandbox
      .stub(
        addToCartUseCase.productRepo,
        addToCartUseCase.productRepo.getByID.name
      )
      .resolves({});

    sandbox
      .stub(addToCartUseCase.userRepo, addToCartUseCase.userRepo.addToCart.name)
      .resolves(false);

    const have = await addToCartUseCase.execute({
      userID,
      productID,
      quantity: 2,
    });

    expect(have).to.be.false;
  });

  it("Should return true because the product has been added", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProduct };

    sandbox
      .stub(
        addToCartUseCase.userRepo,
        addToCartUseCase.userRepo.getProductInCartByProductID.name
      )
      .resolves(false);

    sandbox
      .stub(
        addToCartUseCase.productRepo,
        addToCartUseCase.productRepo.getByID.name
      )
      .resolves({});

    sandbox
      .stub(addToCartUseCase.userRepo, addToCartUseCase.userRepo.addToCart.name)
      .resolves(true);

    const have = await addToCartUseCase.execute({
      userID,
      productID,
      quantity: 2,
    });

    expect(have).to.be.true;
  });
});
