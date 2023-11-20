"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";
import request from "supertest";

import Router from "../../router.js";

import express from "../../src/frameworks/express.js";
import ExpressAdapter from "../../src/interfaces/adapters/expressAdapter.js";
import PaymentAdapter from "../../src/interfaces/adapters/paymentAdapter.js";
import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import InMemoryProductRepo from "../../src/interfaces/repositories/memory/inMemoryProductRepo.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };
import validProductOutsideCart from "../mocks/validProductOutsideCart.json" assert { type: "json" };

const sandbox = createSandbox();
const mocks = {
  validUser,
  validProduct,
  validProductOutsideCart,
};
const userRepo = new InMemoryUserRepo();
const productRepo = new InMemoryProductRepo();
const httpAdapter = new ExpressAdapter({ express });
const paymentAdapter = new PaymentAdapter();
const router = new Router({
  userRepo,
  productRepo,
  httpAdapter,
  paymentAdapter,
});

describe("POST /but", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("should request POST /buy route and return HTTP 500", async () => {
    const res = await request(router.httpAdapter.lib).post("/buy").expect(500);

    expect(res.text).to.equal("error");
  });

  it("should request POST /buy route and return HTTP 200", async () => {
    const { userID, address, addressNumber, addressComplement } = {
      ...mocks.validUser,
    };
    const products = [
      { ...mocks.validProduct, quantity: 2 },
      { ...mocks.validProductOutsideCart, quantity: 1 },
    ];

    const res = await request(router.httpAdapter.lib)
      .post("/buy")
      .send({
        userID,
        products,
        address,
        addressNumber,
        addressComplement,
        shipping: 12,
      })
      .expect(200);

    expect(res.text).to.equal("success");
  });
});
