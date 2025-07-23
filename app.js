require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.mongo_connection)
  .then(() => {
    console.log("Mongodb connected Successfully");
  })
  .catch(() => {
    console.log("Mongodb connection failed");
  });

app.use(express.json());
require("./Models/users.model");

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully");
});
