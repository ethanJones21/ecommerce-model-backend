"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const { dbConnection } = require("./database/config");

const ClientsRoutes = require("./routes/client.routes");
const UsersRoutes = require("./routes/user.routes");
const ProductsRoutes = require("./routes/product.routes");

const UsersAuthRoutes = require("./auth/routes/user-auth.routes");
const ClientsAuthRoutes = require("./auth/routes/client-auth.routes");
const CORS = require("./middlewares/cors.middleware");

app.use(morgan("combined"));
//// Lectura y parseo del body
app.use(express.json());
////  Leer de formularios
app.use(express.urlencoded({ extended: true }));

dbConnection();

// CORS
// app.use(CORS);
app.use(cors());

app.use("/clients", ClientsRoutes);
app.use("/users", UsersRoutes);
app.use("/products", ProductsRoutes);

// AUTH
app.use("/auth", ClientsAuthRoutes);
app.use("/auth-user", UsersAuthRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

app.listen(process.env.MONGO_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.MONGO_PORT);
});
