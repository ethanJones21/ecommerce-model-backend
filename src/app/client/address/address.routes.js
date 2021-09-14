const { Router } = require("express");

const {
    getAddressesByPage,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
} = require("./address.controller");
const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getAddressesByPage);
router.get("/:id", validateJWT, getAddress);

router.post("/", validateJWT, createAddress);
router.put("/:id", validateJWT, updateAddress);

router.delete("/:id", validateJWT, deleteAddress);

module.exports = router;
