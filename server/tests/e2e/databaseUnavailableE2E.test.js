"use strict";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import express from "express";

import Router from "../../router.js";

import ExpressAdapter from "../../src/interfaces/adapters/expressAdapter.js";
import PaymentAdapter from "../../src/interfaces/adapters/paymentAdapter.js";
import MongoDBUserRepo from "../../src/interfaces/repositories/mongodb/mongoDBUserRepo.js";
import MongoDBProductRepo from "../../src/interfaces/repositories/mongodb/mongoDBProductRepo.js";

// A MongoDB that never answers, as when the mongo container is down.
const mongodb = {
  connect: () => Promise.reject(new Error("connect ECONNREFUSED")),
};

function newApp() {
  const app = express();
  app.use(express.json());
  return app;
}

describe("MongoDB unavailable", () => {
  let consoleError;

  before(() => {
    consoleError = sinon.stub(console, "error");
  });

  after(() => {
    consoleError.restore();
  });

  const router = new Router({
    userRepo: new MongoDBUserRepo({ mongodb }),
    productRepo: new MongoDBProductRepo({ mongodb }),
    httpAdapter: new ExpressAdapter({ express: newApp() }),
    paymentAdapter: new PaymentAdapter(),
  });

  it("should answer GET /products with HTTP 503 instead of crashing", async () => {
    const res = await request(router.httpAdapter.lib)
      .get("/products")
      .expect(503);

    expect(res.text).to.equal("service unavailable");
  });

  it("should answer POST /login with HTTP 503 instead of crashing", async () => {
    const res = await request(router.httpAdapter.lib)
      .post("/login")
      .send({ email: "a@b.c", password: "x" })
      .expect(503);

    expect(res.text).to.equal("service unavailable");
  });

  it("should keep answering GET / while the database is down", async () => {
    await request(router.httpAdapter.lib).get("/").expect(200);
  });
});

describe("ExpressAdapter errors", () => {
  let consoleError;

  before(() => {
    consoleError = sinon.stub(console, "error");
  });

  after(() => {
    consoleError.restore();
  });

  it("should answer HTTP 503 when the driver finds no server", async () => {
    const adapter = new ExpressAdapter({ express: newApp() });
    adapter.get("/", async () => {
      const err = new Error("Server selection timed out");
      err.name = "MongoServerSelectionError";
      throw err;
    });

    await request(adapter.lib).get("/").expect(503);
  });

  it("should answer HTTP 500 for any other error", async () => {
    const adapter = new ExpressAdapter({ express: newApp() });
    adapter.get("/", () => {
      throw new TypeError("boom");
    });

    const res = await request(adapter.lib).get("/").expect(500);
    expect(res.text).to.equal("internal server error");
  });
});
