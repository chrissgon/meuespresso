"use strict";

export default class GetProductsController {
  constructor({ getProductsUseCase }) {
    this.getProductsUseCase = getProductsUseCase;
  }

  async handle(req, res) {
    const products = await this.getProductsUseCase.execute(req.query);

    if (!products || products.length === 0) {
      res.status(404).send("not found");
      return;
    }

    res.status(200).json(products);
  }
}
