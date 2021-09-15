const { Router } = require("express");

const { createSale } = require("./sale.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.post("/", validateJWT, createSale);

module.exports = router;
