const { Router } = require("express");

const {
    getCart,
    addProductToCart,
    deleteProductOfCart,
} = require("../controllers/cart.controller");

const router = Router();

router.get("/:cartID", getCart);

router.put("/:clientID/:productID", addProductToCart);

router.delete("/:cartID/:productID", deleteProductOfCart);

module.exports = router;
