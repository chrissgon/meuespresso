"use strict";

import { createHash } from "node:crypto";

export default class UpdateUserUseCase {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({
    userID,
    address,
    addressNumber,
    addressComplement,
    password,
  }) {
    if (!userID) return false;

    password = createHash("md5").update(password).digest("hex");

    return this.userRepo.updateByID({
      userID,
      address,
      addressNumber,
      addressComplement,
      password,
    });
  }
}
