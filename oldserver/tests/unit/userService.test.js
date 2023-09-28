"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import UserRepoLocalDB from "../../infra/database/local/userRepoLocalDB.js";
import ProductRepoLocalDB from "../../infra/database/local/productRepoLocalDB.js";

import UserRepo from "../../src/repositories/userRepo.js";
import ProductRepo from "../../src/repositories/productRepo.js";

import UserService from "../../src/services/userService.js";
import OrderService from "../../src/services/orderService.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };

const productRepoLocalDB = new ProductRepoLocalDB();
const userRepoLocalDB = new UserRepoLocalDB({ productRepoLocalDB });
const userRepo = new UserRepo({ db: userRepoLocalDB });
const productRepo = new ProductRepo({ db: productRepoLocalDB });
const orderService = new OrderService({ userRepo, productRepo });
const userService = new UserService({ userRepo, productRepo, orderService });

let err;
const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
};

describe("UserService Suite Tests", () => {
  beforeEach(() => {
    err = null;
    sandbox.restore();
  });

  describe("login", () => {
    it("Should return an error because the credentials is invalid", async () => {
      const user = Object.create(mocks.validUser);

      sandbox
        .stub(userService.userRepo, userService.userRepo.login.name)
        .resolves(null);

      await catchError(userService.login.bind(userService), {
        email: user.email,
        password: user.password,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an user because the credentials is valid", async () => {
      const user = Object.create(mocks.validUser);

      sandbox
        .stub(userService.userRepo, userService.userRepo.login.name)
        .resolves(user);

      const have = await userService.login({
        email: user.email,
        password: user.password,
      });

      expect(have).to.be.deep.equal(user);
    });
  });

  describe("productExistInCart", () => {
    it("Should return false because the product doesnt exists", async () => {
      sandbox
        .stub(
          userService.userRepo,
          userService.userRepo.getProductInCartByProductID.name
        )
        .resolves(null);

      const have = await userService.productExistInCart({
        userID: mocks.validUser.userID,
        productID: mocks.validProduct.productID,
      });

      expect(have).to.be.false;
    });

    it("Should return true because the product exists", async () => {
      sandbox
        .stub(
          userService.userRepo,
          userService.userRepo.getProductInCartByProductID.name
        )
        .resolves({ productID: mocks.validProduct.productID });

      const have = await userService.productExistInCart({
        userID: mocks.validUser.userID,
        productID: mocks.validProduct.productID,
      });

      expect(have).to.be.true;
    });
  });

  describe("addToCart", () => {
    it("Should return an error because the product exists", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(true);

      await catchError(userService.addToCart.bind(userService), {
        userID: user.userID,
        productID: product.productID,
        quantity: 1,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an error because the product was not added", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(false);
      sandbox
        .stub(userService.userRepo, userService.userRepo.addToCart.name)
        .resolves(false);

      await catchError(userService.addToCart.bind(userService), {
        userID: user.userID,
        productID: product.productID,
        quantity: 1,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return true because the product has been added", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(false);
      sandbox
        .stub(userService.userRepo, userService.userRepo.addToCart.name)
        .resolves(true);

      const have = await userService.addToCart({
        userID: user.userID,
        productID: product.productID,
        quantity: 1,
      });

      expect(have).to.be.true;
    });
  });

  describe("removeToCart", () => {
    it("Should return an error because the product doesnt exists", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(false);

      await catchError(userService.removeToCart.bind(userService), {
        userID: user.userID,
        productID: product.productID,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return an error because the product was not removed", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(true);
      sandbox
        .stub(userService.userRepo, userService.userRepo.removeToCart.name)
        .resolves(false);

      await catchError(userService.removeToCart.bind(userService), {
        userID: user.userID,
        productID: product.productID,
      });

      expect(err).to.be.instanceof(Error);
    });

    it("Should return true because the product has been removed", async () => {
      const user = Object.create(mocks.validUser);
      const product = Object.create(mocks.validProduct);

      sandbox
        .stub(userService, userService.productExistInCart.name)
        .resolves(true);

      sandbox
        .stub(userService.userRepo, userService.userRepo.removeToCart.name)
        .resolves(true);

      const have = await userService.removeToCart({
        userID: user.userID,
        productID: product.productID,
      });

      expect(have).to.be.true;
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
