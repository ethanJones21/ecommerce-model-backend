"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

const { dbConnection } = require("./database/config");

const ClienteRoutes = require("./routes/cliente.routes");

//// Lectura y parseo del body
app.use(express.json());
////  Leer de formularios
app.use(express.urlencoded({ extended: true }));

dbConnection();

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

app.use("/cliente", ClienteRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

app.listen(process.env.MONGO_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.MONGO_PORT);
});
