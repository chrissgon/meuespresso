"use strict";

import request from "supertest";
import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import app from "../../api.js";

describe("API Suite Test", () => {
  describe("POST /login", () => {
    it("should request POST /login route and return HTTP 401", async () => {
      const res = await request(app).post("/login").expect(200);

      expect(res.text).to.deep.equal(JSON.stringify({name: "Christopher"}));
    });
  });
});
