const { Router } = require("express");

const { getAddressesByPage, getAddress } = require("./address.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const { validateUSER } = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateUSER], getAddressesByPage);
router.get("/:id", [validateJWT, validateUSER], getAddress);

module.exports = router;
