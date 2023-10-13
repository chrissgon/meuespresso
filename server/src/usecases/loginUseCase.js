"use strict";

import {createHash} from "node:crypto"

export default class LoginUseCase {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({ email, password }) {
    password = createHash("md5").update(password).digest('hex')
    
    const user = await this.userRepo.login({ email, password });

    if (!user) return false;

    return user;
  }
}
