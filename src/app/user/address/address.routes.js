const { Router } = require("express");

const { getAddressesByPage, getAddress } = require("./address.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getAddressesByPage);
router.get("/:id", validateJWT, getAddress);

module.exports = router;
