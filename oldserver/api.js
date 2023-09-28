"use strict";

import express from "express";
import UserRepoLocalDB from "./infra/database/local/userRepoLocalDB.js"
// import from "./src/repositories"

const app = express();

app.post("/login", (req, res) => {
  req.body
  res.status(200).json({name: "Christopher"})
});

export default app;
