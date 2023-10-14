"use strict";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };

const mocks = { validUser };
const router = new Router();

describe("POST /getUser", () => {
  it("should request POST /getUser route and return HTTP 404", async () => {
    const res = await request(router.httpAdapter.lib)
      .post("/getUser")
      .send({})
      .expect(404);

    expect(res.text).to.equal("not found");
  });

  it("should request POST /getUser route and return HTTP 200", async () => {
    const { userID } = { ...mocks.validUser };

    const res = await request(router.httpAdapter.lib)
      .post("/getUser")
      .send({ userID })
      .expect(200);

    expect(JSON.parse(res.text)).to.deep.equal(mocks.validUser);
  });
});
