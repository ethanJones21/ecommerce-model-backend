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

const { dbConnection } = require("./src/database/config");

// Admin
const {
    AdminClientRoutes,
    AdminSettingRoutes,
    AdminUserRoutes,
    AdminHomeRoutes,
} = require("./src/app/admin/admin.module");

// User
const {
    UserAddressRoutes,
    UserCouponRoutes,
    UserGaleryRoutes,
    UserInventoryRoutes,
    UserMessageRoutes,
    UserProductRoutes,
    UserOrderRoutes,
    UserRoutes,
    UserVarietyRoutes,
} = require("./src/app/user/user.module");

// Client
const {
    ClientAddressRoutes,
    ClientCartRoutes,
    ClientRoutes,
    ClientOrderRoutes,
    ClientSettingRoutes,
    ClientMessageRoutes,
    ClientReviewRoutes,
    ClientWishListRoutes,
    ClientProductRoutes,
} = require("./src/app/client/client.module");

// File
const FileRoutes = require("./src/app/file/file.routes");
const SidebarRoutes = require("./src/app/sidebar/sidebar.routes");

app.use(morgan("tiny"));
//// Lectura y parseo del body
app.use(express.json());
////  Leer de formularios
app.use(express.urlencoded({ extended: true }));

dbConnection();

// CORS
// app.use(CORS);
app.use(cors());

// Admin
app.use("/admins/clients", AdminClientRoutes);
app.use("/admins/settings", AdminSettingRoutes);
app.use("/admins/users", AdminUserRoutes);
app.use("/admins/home", AdminHomeRoutes);

// User
app.use("/users/addresses", UserAddressRoutes);
app.use("/users/coupons", UserCouponRoutes);
app.use("/users/galery", UserGaleryRoutes);
app.use("/users/inventories", UserInventoryRoutes);
app.use("/users/messages", UserMessageRoutes);
app.use("/users/products", UserProductRoutes);
app.use("/users/orders", UserOrderRoutes);
app.use("/users", UserRoutes);
app.use("/users/varieties", UserVarietyRoutes);

// Client
app.use("/clients/addresses", ClientAddressRoutes);
app.use("/clients/cart", ClientCartRoutes);
app.use("/clients", ClientRoutes);
app.use("/clients/settings", ClientSettingRoutes);
app.use("/clients/orders", ClientOrderRoutes);
app.use("/clients/messages", ClientMessageRoutes);
app.use("/clients/reviews", ClientReviewRoutes);
app.use("/clients/wishlist", ClientWishListRoutes);
app.use("/clients/products", ClientProductRoutes);

// File
app.use("/file", FileRoutes);

// Sidebar
app.use("/sidebar", SidebarRoutes);

// // AUTH
// app.use("/auth", ClientsAuthRoutes);
// app.use("/auth-user", UsersAuthRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

server.listen(process.env.MONGO_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.MONGO_PORT);
});
