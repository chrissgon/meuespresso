"use strict";

export default class GetUserUseCase {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({ userID }) {
    if(!userID) return false
    return this.userRepo.getByID({ userID });
  }
}
