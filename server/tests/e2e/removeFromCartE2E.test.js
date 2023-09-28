"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProduct from "../mocks/validProduct.json" assert { type: "json" };
import validProductOutsideCart from "../mocks/validProductOutsideCart.json" assert { type: "json" };

const mocks = { validUser, validProduct, validProductOutsideCart };
const router = new Router()

describe("POST /removeFromCart", () => {
  it("should request POST /removeFromCart route and return HTTP 500", async () => {
    const { userID } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProductOutsideCart);

    const res = await request(router.httpAdapter.lib)
      .post("/removeFromCart")
      .send({ userID, productID })
      .expect(500);

    expect(res.text).to.equal("error");
  });

  it("should request POST /removeFromCart route and return HTTP 200", async () => {
    const { userID } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProduct);

    const res = await request(router.httpAdapter.lib)
      .post("/removeFromCart")
      .send({ userID, productID })
      .expect(200);

    expect(res.text).to.equal("success");
  });
});
