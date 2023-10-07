"use strict";

import express from "./src/frameworks/express.js";
import mongodb from "./src/frameworks/mongodb.js";

import ExpressAdapter from "./src/interfaces/adapters/expressAdapter.js";
import PaymentAdapter from "./src/interfaces/adapters/paymentAdapter.js";

import MongoDBUserRepo from "./src/interfaces/repositories/mongodb/mongoDBUserRepo.js";
import MongoDBProductRepo from "./src/interfaces/repositories/mongodb/mongoDBProductRepo.js";
import InMemoryUserRepo from "./src/interfaces/repositories/memory/inMemoryUserRepo.js";
import InMemoryProductRepo from "./src/interfaces/repositories/memory/inMemoryProductRepo.js";

import LoginUseCase from "./src/usecases/loginUseCase.js";
import AddToCartUseCase from "./src/usecases/addToCartUseCase.js";
import RemoveFromCartUseCase from "./src/usecases/removeFromCartUseCase.js";
import BuyUseCase from "./src/usecases/buyUseCase.js";
import GetProductsUseCase from "./src/usecases/getProductsUseCase.js";

import LoginController from "./src/interfaces/controllers/loginController.js";
import AddToCartController from "./src/interfaces/controllers/addToCartController.js";
import RemoveFromCartController from "./src/interfaces/controllers/removeFromCartController.js";
import BuyController from "./src/interfaces/controllers/buyController.js";
import GetProductsController from "./src/interfaces/controllers/getProductsController.js";

export default class Router {
  constructor() {
    // repos
    // this.userRepo = new MongoDBUserRepo({ mongodb });
    // this.productRepo = new MongoDBProductRepo({ mongodb });
    this.userRepo = new InMemoryUserRepo();
    this.productRepo = new InMemoryProductRepo();

    // adapters
    this.httpAdapter = new ExpressAdapter({ express });
    this.paymentAdapter = new PaymentAdapter();

    // usecases
    this.loginUseCase = new LoginUseCase({ userRepo: this.userRepo });
    this.addToCartUseCase = new AddToCartUseCase({
      userRepo: this.userRepo,
      productRepo: this.productRepo,
    });
    this.removeFromCartUseCase = new RemoveFromCartUseCase({
      userRepo: this.userRepo,
    });
    this.buyUseCase = new BuyUseCase({
      userRepo: this.userRepo,
      paymentAdapter: this.paymentAdapter,
    });
    this.getProductsUseCase = new GetProductsUseCase({
      productRepo: this.productRepo,
    });

    // controllers
    this.loginController = new LoginController({
      loginUseCase: this.loginUseCase,
    });
    this.addToCartController = new AddToCartController({
      addToCartUseCase: this.addToCartUseCase,
    });
    this.removeFromCartController = new RemoveFromCartController({
      removeFromCartUseCase: this.removeFromCartUseCase,
    });
    this.buyController = new BuyController({
      buyUseCase: this.buyUseCase,
    });
    this.getProductsController = new GetProductsController({
      getProductsUseCase: this.getProductsUseCase,
    });

    // routes
    this.httpAdapter.post(
      "/login",
      this.loginController.handle.bind(this.loginController)
    );
    this.httpAdapter.post(
      "/addToCart",
      this.addToCartController.handle.bind(this.addToCartController)
    );
    this.httpAdapter.post(
      "/removeFromCart",
      this.removeFromCartController.handle.bind(this.removeFromCartController)
    );
    this.httpAdapter.post(
      "/buy",
      this.buyController.handle.bind(this.buyController)
    );
    this.httpAdapter.get(
      "/products",
      this.getProductsController.handle.bind(this.getProductsController)
    );
  }
}

// const userRepo = new MongoDBUserRepo({ mongodb });

// export default this.httpAdapter;
