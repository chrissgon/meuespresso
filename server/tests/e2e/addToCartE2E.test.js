"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import express from "../../src/frameworks/express.js";
import ExpressAdapter from "../../src/interfaces/adapters/expressAdapter.js";
import PaymentAdapter from "../../src/interfaces/adapters/paymentAdapter.js";
import InMemoryUserRepo from "../../src/interfaces/repositories/memory/inMemoryUserRepo.js";
import InMemoryProductRepo from "../../src/interfaces/repositories/memory/inMemoryProductRepo.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProductOutsideCart from "../mocks/validProductOutsideCart.json" assert { type: "json" };

const mocks = { validUser, validProductOutsideCart };

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

describe("POST /addToCart", () => {
  it("should request POST /addToCart route and return HTTP 500", async () => {
    const res = await request(router.httpAdapter.lib)
      .post("/addToCart")
      .expect(500);

    expect(res.text).to.equal("error");
  });

  it("should request POST /addToCart route and return HTTP 200", async () => {
    const { userID } = { ...mocks.validUser };
    const { productID } = { ...mocks.validProductOutsideCart };

    const res = await request(router.httpAdapter.lib)
      .post("/addToCart")
      .send({ userID, productID, quantity: 2 })
      .expect(200);

    expect(res.text).to.equal("success");
  });
});
