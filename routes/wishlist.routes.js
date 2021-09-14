const { Router } = require("express");

const {
    getWishList,
    addProductToWishList,
} = require("../controllers/wishlist.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/", validateJWT, getWishList);

router.put("/", validateJWT, addProductToWishList);

module.exports = router;
