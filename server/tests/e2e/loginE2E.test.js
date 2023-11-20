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

const mocks = { validUser };

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

describe("POST /login", () => {
  it("should request POST /login route and return HTTP 401", async () => {
    const { email } = { ...mocks.validUser };

    const res = await request(router.httpAdapter.lib)
      .post("/login")
      .send({ email, password: "" })
      .expect(401);

    expect(res.text).to.equal("unauthorized");
  });

  it("should request POST /login route and return HTTP 200", async () => {
    const { email } = { ...mocks.validUser };

    const res = await request(router.httpAdapter.lib)
      .post("/login")
      .send({ email, password: "123456" })
      .expect(200);

    expect(JSON.parse(res.text)).to.deep.equal(mocks.validUser);
  });
});
