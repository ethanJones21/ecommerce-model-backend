const { Router } = require("express");

const { getAddressesByPage, getAddress } = require("./address.controller");
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
    getAddressesByPage
);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getAddress);

module.exports = router;
