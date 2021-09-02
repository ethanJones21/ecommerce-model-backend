const { Router } = require("express");

const {
    getCart,
    addProductToCart,
    deleteProductOfCart,
} = require("../controllers/cart.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/", validateJWT, getCart);

router.put("/:productID", validateJWT, addProductToCart);

router.delete("/:cartID/:productID", deleteProductOfCart);

module.exports = router;
