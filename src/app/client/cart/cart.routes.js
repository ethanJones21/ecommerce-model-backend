const { Router } = require("express");

const {
    getCart,
    addProductToCart,
    deleteProductOfCart,
} = require("./cart.controller");

const router = Router();

router.get("/:cartID", getCart);

router.put("/:cartID/:productID", addProductToCart);

router.delete("/:cartID/:productID", deleteProductOfCart);

module.exports = router;
