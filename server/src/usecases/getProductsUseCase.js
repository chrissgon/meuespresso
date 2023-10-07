"use strict";

export default class GetProductsUseCase {
  constructor({ productRepo }) {
    this.productRepo = productRepo;
  }

  async execute({ name }) {
    if (name) {
      return this.productRepo.getByFilters({ name });
    }

    return this.productRepo.getAll();
  }
}
