"use strict";

import express from "./src/frameworks/express.js";
import mongodb from "./src/frameworks/mongodb.js";

import ExpressAdapter from "./src/interfaces/adapters/expressAdapter.js";
import PaymentAdapter from "./src/interfaces/adapters/paymentAdapter.js";

import MongoDBUserRepo from "./src/interfaces/repositories/mongodb/mongoDBUserRepo.js";
import MongoDBProductRepo from "./src/interfaces/repositories/mongodb/mongoDBProductRepo.js";

const userRepo = new MongoDBUserRepo({ mongodb });
const productRepo = new MongoDBProductRepo({ mongodb });
const httpAdapter = new ExpressAdapter({ express });
const paymentAdapter = new PaymentAdapter();

import Router from "./router.js";

const port = 3333;

const app = new Router({ userRepo, productRepo, httpAdapter, paymentAdapter })
  .httpAdapter.lib;

app.listen(port);
