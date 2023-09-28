"use strict";

export default class RemoveFromCartController {
  constructor({ removeFromCartUseCase }) {
    this.removeFromCartUseCase = removeFromCartUseCase;
  }

  async handle(req, res) {
    const ok = await this.removeFromCartUseCase.execute(req.body);

    if (!ok) {
      res.status(500).send("error");
      return;
    }

    res.status(200).send("success");
  }
}
