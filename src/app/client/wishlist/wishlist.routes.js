const { Router } = require("express");

const { getWishList, addProductToWishList } = require("./wishlist.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/", validateJWT, getWishList);

router.put("/", validateJWT, addProductToWishList);

module.exports = router;
