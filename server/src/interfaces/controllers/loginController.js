"use strict";

export default class LoginController {
  constructor({ loginUseCase }) {
    this.loginUseCase = loginUseCase;
  }

  async handle(req, res) {
    const user = await this.loginUseCase.execute(req.body);

    if (!user) {
      res.status(401).send("unauthorized");
      return;
    }

    res.status(200).json(user);
  }
}
