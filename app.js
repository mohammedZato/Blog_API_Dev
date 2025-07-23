require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./Modules/Users/Controller/users.routes");

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

//Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully");
});
