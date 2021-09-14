const { Router } = require("express");

const {
    getUsersByPage,
    getUser,
    updateUser,
    deactivateUser,
} = require("./user.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getUsersByPage);
router.get("/:id", validateJWT, getUser);

router.put("/:id", validateJWT, updateUser);
router.patch("/:id", validateJWT, deactivateUser);

module.exports = router;
