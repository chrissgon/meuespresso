"use strict";

import express from "express";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());


// app.enable("trust proxy");
// app.use(function (request, response, next) {
//   if (process.env.NODE_ENV != "development" && !request.secure) {
//     return response.redirect("https://" + request.headers.host + request.url);
//   }

//   next();
// });

export default app;
