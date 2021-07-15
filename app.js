"use strict";

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.port || 4201;

mongoose.connect("mongodb://127.0.0.1:27017/tienda", (err, res) =>
  err
    ? console.log(err)
    : app.listen(port, () => console.log("Server run in port " + port))
);

module.exports = app;
