const { Router } = require("express");

const {
    createOrder,
    getOrder,
    getClientOrdersByPage,
} = require("./order.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getClientOrdersByPage);
router.post("/:id", validateJWT, getOrder);
router.post("/", validateJWT, createOrder);

module.exports = router;
