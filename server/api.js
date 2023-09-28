"use strict";

import express from "./src/frameworks/express.js";
import mongodb from "./src/frameworks/mongodb.js";

import ExpressAdapter from "./src/interfaces/adapters/expressAdapter.js";
// import MongoDBUserRepo from "./src/interfaces/repositories/mongodb/mongoDBUserRepo.js";
import InMemoryUserRepo from "./src/interfaces/repositories/memory/inMemoryUserRepo.js";

import LoginUseCase from "./src/usecases/loginUseCase.js";

import LoginController from "./src/interfaces/controllers/loginController.js";

// const userRepo = new MongoDBUserRepo({ mongodb });
const userRepo = new InMemoryUserRepo();

const httpAdapter = new ExpressAdapter({ express });

const loginUseCase = new LoginUseCase({ userRepo });

httpAdapter.post("/login", (req, res) => {
  new LoginController({ loginUseCase }).handle(req, res);
});

export default httpAdapter;
