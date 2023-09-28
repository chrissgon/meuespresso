"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };
import validProductOutsideCart from "../mocks/validProductOutsideCart.json" assert { type: "json" };

const mocks = { validUser, validProductOutsideCart };
const router = new Router();

describe("POST /addToCart", () => {
  it("should request POST /addToCart route and return HTTP 500", async () => {
    const res = await request(router.httpAdapter.lib).post("/addToCart").expect(500);

    expect(res.text).to.equal("error");
  });

  it("should request POST /addToCart route and return HTTP 200", async () => {
    const { userID } = Object.create(mocks.validUser);
    const { productID } = Object.create(mocks.validProductOutsideCart);

    const res = await request(router.httpAdapter.lib)
      .post("/addToCart")
      .send({ userID, productID, quantity: 2 })
      .expect(200);

    expect(res.text).to.equal("success");
  });
});
