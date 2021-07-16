"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.port || 4201;

const ClienteRoutes = require("./routes/cliente.routes");

mongoose.connect("mongodb://127.0.0.1:27017/tienda", (err, res) =>
    err
        ? console.log(err)
        : app.listen(port, () => console.log("Server run in port " + port))
);

//// Lectura y parseo del body
app.use(express.json());
////  Leer de formularios
app.use(express.urlencoded({ extended: true }));

// CORSE
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
    );
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use("/api", ClienteRoutes);

module.exports = app;
