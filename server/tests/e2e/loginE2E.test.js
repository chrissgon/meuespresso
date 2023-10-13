"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };

const mocks = { validUser };
const router = new Router();

describe("POST /login", () => {
  it("should request POST /login route and return HTTP 401", async () => {
    const { email } = Object.create(mocks.validUser);
    
    const res = await request(router.httpAdapter.lib)
      .post("/login")
      .send({ email, password: "" })
      .expect(401);

    expect(res.text).to.equal("unauthorized");
  });

  it("should request POST /login route and return HTTP 200", async () => {
    const { email } = Object.create(mocks.validUser);

    const res = await request(router.httpAdapter.lib)
      .post("/login")
      .send({ email, password: "123456" })
      .expect(200);

    expect(JSON.parse(res.text)).to.deep.equal(mocks.validUser);
  });
});
