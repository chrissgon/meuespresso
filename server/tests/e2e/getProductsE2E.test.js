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

import validProduct from "../mocks/validProduct.json" assert { type: "json" };

const mocks = { validProduct };

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

describe("GET /products", () => {
  it("should request GET /products route and return HTTP 404", async () => {
    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .query({ name: "test" })
      .expect(404);

    expect(res.text).to.equal("not found");
  });

  it("should request GET /products route and return HTTP 200", async () => {
    const product = { ...mocks.validProduct };
    const { name } = product;

    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .query({ name })
      .expect(200);

    expect(JSON.parse(res.text)).to.be.deep.equal([product]);
  });

  it("should request GET /products route and return HTTP 200", async () => {
    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .expect(200);

    expect(JSON.parse(res.text).length).to.be.greaterThan(1);
  });
});
