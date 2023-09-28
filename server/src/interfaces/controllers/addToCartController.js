"use strict";

export default class AddToCartController {
  constructor({ addToCartUseCase }) {
    this.addToCartUseCase = addToCartUseCase;
  }

  async handle(req, res) {
    const ok = await this.addToCartUseCase.execute(req.body);

    if (!ok) {
      res.status(500).send("error");
      return;
    }

    res.status(200).send("success");
  }
}
