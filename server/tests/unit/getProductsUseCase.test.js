"use strict";

import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { createSandbox } from "sinon";

import validProduct from "../mocks/validProduct.json" assert { type: "json" };

import InMemoryProductRepo from "../../src/interfaces/repositories/memory/inMemoryProductRepo.js";

import GetProductsUseCase from "../../src/usecases/getProductsUseCase.js";

const sandbox = createSandbox();
const mocks = {
  validProduct,
};

const productRepo = new InMemoryProductRepo();
const getProductsUseCase = new GetProductsUseCase({ productRepo });

describe("GetProductsUseCase Unit Test", () => {
  beforeEach(() => {
    sandbox.restore();
  });

  it("Should return true because the filter is working", async () => {
    const product = Object.create(mocks.validProduct);
    const { name } = product;

    const stub = sandbox
      .stub(
        getProductsUseCase.productRepo,
        getProductsUseCase.productRepo.getByFilters.name
      )
      .resolves([product]);

    const have = await getProductsUseCase.execute({ name });

    expect(have).to.be.length(1);
    expect(have).to.be.deep.equal([product]);
    expect(stub.calledOnceWith({ name })).to.be.true;
  });

  it("Should return true because return all products", async () => {
    const product = Object.create(mocks.validProduct);

    const stub = sandbox
      .stub(
        getProductsUseCase.productRepo,
        getProductsUseCase.productRepo.getAll.name
      )
      .resolves([product]);

    const have = await getProductsUseCase.execute({});

    expect(have).to.be.length(1);
    expect(have).to.be.deep.equal([product]);
    expect(stub.calledOnceWith()).to.be.true;
  });
});
