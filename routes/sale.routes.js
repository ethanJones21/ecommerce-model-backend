const { Router } = require("express");

const { getSales, createSale } = require("../controllers/sale.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const { validateADMIN } = require("../middlewares/role.middleware");

const router = Router();

router.get("/", [validateJWT, validateADMIN], getSales);

router.post("/", validateJWT, createSale);

module.exports = router;
