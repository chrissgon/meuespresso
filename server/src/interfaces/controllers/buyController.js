"use strict";

export default class BuyController {
  constructor({ buyUseCase }) {
    this.buyUseCase = buyUseCase;
  }

  async handle(req, res) {
    const ok = await this.buyUseCase.execute(req.body);

    if (!ok) {
      res.status(500).send("error");
      return;
    }

    res.status(200).send("success");
  }
}
