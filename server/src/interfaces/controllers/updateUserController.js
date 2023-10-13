"use strict";

export default class UpdateUserController {
  constructor({ updateUserUseCase }) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async handle(req, res) {
    const user = await this.updateUserUseCase.execute(req.body);

    if (!user) {
      res.status(404).send("error");
      return;
    }

    res.status(200).json(user);
  }
}
