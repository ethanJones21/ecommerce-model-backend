const { Router } = require("express");

const { getSales, createSale } = require("./sale.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const {
    validateADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/", [validateJWT, validateADMIN], getSales);

router.post("/", validateJWT, createSale);

module.exports = router;
