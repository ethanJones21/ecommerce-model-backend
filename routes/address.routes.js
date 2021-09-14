const { Router } = require("express");

const {
    getAddressesByPage,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
} = require("../controllers/cart.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getAddressesByPage);
router.get("/:id", validateJWT, getAddress);

router.post("/", validateJWT, createAddress);
router.put("/:id", validateJWT, updateAddress);

router.delete("/:id", validateJWT, deleteAddress);

module.exports = router;
