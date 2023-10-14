"use strict";

export default class GetUserController {
  constructor({ getUserUseCase }) {
    this.getUserUseCase = getUserUseCase;
  }

  async handle(req, res) {
    const user = await this.getUserUseCase.execute(req.body);

    if (!user) {
      res.status(404).send("not found");
      return;
    }

    res.status(200).json(user);
  }
}
