"use strict";

import { createHash } from "node:crypto";

import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";

import Router from "../../router.js";

import validUser from "../mocks/validUser.json" assert { type: "json" };

const mocks = { validUser };
const router = new Router();

describe("POST /updateUser", () => {
  it("should request POST /updateUser route and return HTTP 404", async () => {
    const res = await request(router.httpAdapter.lib)
      .post("/updateUser")
      .expect(404);

    expect(res.text).to.be.equal("error");
  });

  it("should request POST /updateUser route and return HTTP 200", async () => {
    const password = "123456789";
    const user = {
      ...mocks.validUser,
      password,
    };
    const res = await request(router.httpAdapter.lib)
      .post("/updateUser")
      .send(user)
      .expect(200);

    expect(JSON.parse(res.text)).to.be.deep.equal({
      ...mocks.validUser,
      password: createHash("md5").update(password).digest("hex"),
    });
  });
});
