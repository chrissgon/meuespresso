"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };
import validOrder from "../mocks/validOrder.json" assert { type: "json" };

import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import PaymentAdapter from "../../src/interfaces/adapters/paymentAdapter.js";

import BuyUseCase from "../../src/usecases/buyUseCase.js";

const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
  validOrder,
};

const userRepo = new InMemoryUserRepo();
const paymentAdapter = new PaymentAdapter();
const buyUseCase = new BuyUseCase({ userRepo, paymentAdapter });

describe("BuyUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return an error because the userID is invalid", async () => {
    const have = await buyUseCase.validate({});

    expect(have).to.deep.equal(new Error("invalid userID"));
  });

  it("Should return an error because not found the user", async () => {
    const { userID } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(undefined);

    const have = await buyUseCase.validate({ userID });

    expect(have).to.deep.equal(new Error("not found user"));
  });

  it("Should return an error because the products are empty", async () => {
    const { userID } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({ userID, products: [] });

    expect(have).to.deep.equal(new Error("empty products"));
  });

  it("Should return an error because the address is empty", async () => {
    const { userID } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({ userID, products: [{}] });

    expect(have).to.deep.equal(new Error("invalid address"));
  });

  it("Should return an error because the address number is empty", async () => {
    const { userID, address } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({
      userID,
      products: [{}],
      address,
    });

    expect(have).to.deep.equal(new Error("invalid address number"));
  });

  it("Should return an error because the quantity is invalid", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({
      userID,
      products: [{}],
      address,
      addressNumber,
    });

    expect(have).to.deep.equal(new Error("invalid quantity"));
  });

  it("Should return an error because the shipping is invalid", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({
      userID,
      products: [{ quantity: 1 }],
      address,
      addressNumber,
    });

    expect(have).to.deep.equal(new Error("invalid shipping"));
  });

  it("Should return true because the order fields are valid", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.getByID.name)
      .resolves(true);

    const have = await buyUseCase.validate({
      userID,
      products: [{ quantity: 1 }],
      address,
      addressNumber,
      shipping: 0,
    });

    expect(have).to.be.true;
  });

  it("Should return false because the payment is invalid", async () => {
    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(true);
    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.validate.name)
      .resolves(false);

    const have = await buyUseCase.execute({});

    expect(have).to.be.false;
  });

  it("Should return false because an error occurred when processing the payment", async () => {
    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(true);
    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.validate.name)
      .resolves(true);
    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.process.name)
      .resolves(false);

    const have = await buyUseCase.execute({});

    expect(have).to.be.false;
  });

  it("Should return false because the order is invalid", async () => {
    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(new Error());

    const have = await buyUseCase.execute({});

    expect(have).to.be.false;
  });

  it("Should return false because ocurred a error when set the order", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProduct);

    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.validate.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.process.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.setOrder.name)
      .resolves(undefined);

    const have = await buyUseCase.execute({
      userID,
      products: [{ productID, quantity: 2 }],
      address,
      addressNumber,
      shipping: 12.5,
    });

    expect(have).to.be.false;
  });

  it("Should return false because ocurred a error when reset the cart", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProduct);
    const { orderID } = Object.create(mocks.validOrder);

    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.validate.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.process.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.setOrder.name)
      .resolves(orderID);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.resetCart.name)
      .resolves(undefined);

    const have = await buyUseCase.execute({
      userID,
      products: [{ productID, quantity: 2 }],
      address,
      addressNumber,
      shipping: 12.5,
      resetCart: true,
    });

    expect(have).to.be.false;
  });

  it("Should return an array of orderID because the buy was a success", async () => {
    const { userID, address, addressNumber } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProduct);
    const { orderID } = Object.create(mocks.validOrder);

    sandbox.stub(buyUseCase, buyUseCase.validate.name).resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.validate.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.paymentAdapter, buyUseCase.paymentAdapter.process.name)
      .resolves(true);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.setOrder.name)
      .resolves(orderID);

    sandbox
      .stub(buyUseCase.userRepo, buyUseCase.userRepo.resetCart.name)
      .resolves(true);

    const have = await buyUseCase.execute({
      userID,
      products: [{ productID, quantity: 2 }],
      address,
      addressNumber,
      shipping: 12.5,
      resetCart: true,
    });

    expect(have).to.be.deep.equal([orderID]);
  });
});
