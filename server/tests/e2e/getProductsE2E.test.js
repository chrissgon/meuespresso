"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validProduct from "../mocks/validProduct.json" assert { type: "json" };

const mocks = { validProduct };
const router = new Router();

describe("GET /products", () => {
  it("should request GET /products route and return HTTP 404", async () => {
    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .send({ name: "test" })
      .expect(404);

    expect(res.text).to.equal("not found");
  });

  it("should request GET /products route and return HTTP 200", async () => {
    const product = Object.create(mocks.validProduct);
    const { name } = product;

    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .send({ name })
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
