"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});
io.on("connection", (client) => {
    client.on("deleteProductOfCart", (cart) => io.emit("deleteProduct", cart));
    client.on("addProductToCart", (cart) => io.emit("newCart", cart));
    client.on("addProductToWishList", (wish) => io.emit("newWish", wish));
    //   client.on('disconnect', () => { /* … */ });
});

const { dbConnection } = require("./database/config");

const ClientsRoutes = require("./routes/client.routes");
const UsersRoutes = require("./routes/user.routes");
const ProductsRoutes = require("./routes/product.routes");
const InventoriesRoutes = require("./routes/inventory.routes");
const UploadsRoutes = require("./routes/uploads.routes");
const CouponsRoutes = require("./routes/coupon.routes");
const ConfigsRoutes = require("./routes/config.routes");
const VarietiesRoutes = require("./routes/variety.routes");
const GaleryRoutes = require("./routes/galery.routes");
const CartRoutes = require("./routes/cart.routes");
const SaleRoutes = require("./routes/sale.routes");
const WishListRoutes = require("./routes/wishlist.routes");
const ReviewRoutes = require("./routes/review.routes");
const MessageRoutes = require("./routes/message.routes");
const AddressRoutes = require("./routes/address.routes");

const UsersAuthRoutes = require("./auth/routes/user-auth.routes");
const ClientsAuthRoutes = require("./auth/routes/client-auth.routes");

app.use(morgan("tiny"));
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
app.use("/inventories", InventoriesRoutes);
app.use("/uploads", UploadsRoutes);
app.use("/coupons", CouponsRoutes);
app.use("/configs", ConfigsRoutes);
app.use("/varieties", VarietiesRoutes);
app.use("/galery", GaleryRoutes);
app.use("/cart", CartRoutes);
app.use("/sales", SaleRoutes);
app.use("/wishlist", WishListRoutes);
app.use("/reviews", ReviewRoutes);
app.use("/messages", MessageRoutes);
app.use("/addresses", AddressRoutes);

// AUTH
app.use("/auth", ClientsAuthRoutes);
app.use("/auth-user", UsersAuthRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

server.listen(process.env.MONGO_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.MONGO_PORT);
});
