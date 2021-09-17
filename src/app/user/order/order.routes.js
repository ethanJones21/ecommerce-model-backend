const { Router } = require("express");

const {
    getAllOrdersByPage,
    getClientOrdersByPage,
    getOrder,
    updateStateOrder,
} = require("./order.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get(
    "/paginado",
    [validateJWT, validateUSER_or_ADMIN],
    getAllOrdersByPage
);
router.get(
    "/paginado/:clientID",
    [validateJWT, validateUSER_or_ADMIN],
    getClientOrdersByPage
);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getOrder);
router.put(
    "/:id/:state",
    [validateJWT, validateUSER_or_ADMIN],
    updateStateOrder
);

module.exports = router;
