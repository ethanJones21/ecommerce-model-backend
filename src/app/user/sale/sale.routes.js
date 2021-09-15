const { Router } = require("express");

const { getSales } = require("./sale.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const { validateUSER } = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/", [validateJWT, validateUSER], getSales);

module.exports = router;
