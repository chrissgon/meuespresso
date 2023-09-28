"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import UserRepoLocalDB from "../../infra/database/local/userRepoLocalDB.js";
import ProductRepoLocalDB from "../../infra/database/local/productRepoLocalDB.js";

import UserRepo from "../../src/repositories/userRepo.js";
import ProductRepo from "../../src/repositories/productRepo.js";

import OrderService from "../../src/services/orderService.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };
import validOrder from "../mocks/validOrder.json" assert { type: "json" };

const productRepoLocalDB = new ProductRepoLocalDB();
const userRepoLocalDB = new UserRepoLocalDB({ productRepoLocalDB });
const userRepo = new UserRepo({ db: userRepoLocalDB });
const productRepo = new ProductRepo({ db: productRepoLocalDB });
const orderService = new OrderService({ userRepo, productRepo });

let err;
const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
  validOrder,
};

describe("OrderService Suite Tests", () => {
  beforeEach(() => {
    err = null;
    sandbox.restore();
  });

  describe("validate", () => {
    it("Should return an error because the userID is invalid", async () => {
      const have = await orderService.validate({});

      expect(have).to.deep.equal(new Error("invalid userID"));
    });

    it("Should return an error because not found the user", async () => {
      const { userID } = Object.create(mocks.validUser);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(undefined);

      const have = await orderService.validate({ userID });

      expect(have).to.deep.equal(new Error("not found user"));
    });

    it("Should return an error because the products are empty", async () => {
      const { userID } = Object.create(mocks.validUser);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({ userID, products: [] });

      expect(have).to.deep.equal(new Error("empty products"));
    });

    it("Should return an error because the address is empty", async () => {
      const { userID } = Object.create(mocks.validUser);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({ userID, products: [{}] });

      expect(have).to.deep.equal(new Error("invalid address"));
    });

    it("Should return an error because the address number is empty", async () => {
      const { userID, address } = Object.create(mocks.validUser);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({
        userID,
        products: [{}],
        address,
      });

      expect(have).to.deep.equal(new Error("invalid address number"));
    });

    it("Should return an error because the quantity is invalid", async () => {
      const { userID, address, addressNumber } = Object.create(mocks.validUser);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({
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
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({
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
        .stub(orderService.userRepo, orderService.userRepo.getByID.name)
        .resolves(true);

      const have = await orderService.validate({
        userID,
        products: [{ quantity: 1 }],
        address,
        addressNumber,
        shipping: 0,
      });

      expect(have).to.be.true;
    });
  });

  describe("buy", () => {
    it("Should return an error because the order is invalid", async () => {
      sandbox
        .stub(orderService, orderService.validate.name)
        .resolves(new Error(""));

      await catchError(orderService.buy.bind(orderService), {});

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an error because ocurred a error when set the order", async () => {
      const { userID, address, addressNumber } = Object.create(mocks.validUser);
      const { productID } = Object.create(mocks.validProduct);

      sandbox.stub(orderService, orderService.validate.name).resolves(true);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.setOrder.name)
        .resolves(undefined);

      await catchError(orderService.buy.bind(orderService), {
        userID,
        products: [{ productID, quantity: 2 }],
        address,
        addressNumber,
        shipping: 12.5,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an error because ocurred a error when reset the cart", async () => {
      const { userID, address, addressNumber } = Object.create(mocks.validUser);
      const { productID } = Object.create(mocks.validProduct);
      const { orderID } = Object.create(mocks.validOrder);

      sandbox.stub(orderService, orderService.validate.name).resolves(true);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.setOrder.name)
        .resolves(orderID);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.resetCart.name)
        .resolves(undefined);

      await catchError(orderService.buy.bind(orderService), {
        userID,
        products: [{ productID, quantity: 2 }],
        address,
        addressNumber,
        shipping: 12.5,
        resetCart: true,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an orderID because the buy was a success", async () => {
      const { userID, address, addressNumber } = Object.create(mocks.validUser);
      const { productID } = Object.create(mocks.validProduct);
      const { orderID } = Object.create(mocks.validOrder);

      sandbox.stub(orderService, orderService.validate.name).resolves(true);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.setOrder.name)
        .resolves(orderID);

      sandbox
        .stub(orderService.userRepo, orderService.userRepo.resetCart.name)
        .resolves(true);

      const have = await orderService.buy({
        userID,
        products: [{ productID, quantity: 2 }],
        address,
        addressNumber,
        shipping: 12.5,
        resetCart: true,
      });

      expect(have).to.be.length(1);
      expect(have[0]).to.be.equal(orderID);
    });
  });
});

async function catchError(fn, params) {
  try {
    await fn(params);
  } catch (e) {
    err = e;
  }
}
