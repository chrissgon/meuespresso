"use strict";

export default class LoginUseCase {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({ email, password }) {
    const user = await this.userRepo.login({ email, password });

    if (!user) return false;

    return user;
  }
}
