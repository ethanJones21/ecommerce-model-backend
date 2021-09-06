const { Router } = require("express");

const {
    getCart,
    addProductToCart,
    deleteProductOfCart,
} = require("../controllers/cart.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/:cartID", getCart);

router.put("/:cartID/:productID", addProductToCart);

router.delete("/:cartID/:productID", deleteProductOfCart);

module.exports = router;
