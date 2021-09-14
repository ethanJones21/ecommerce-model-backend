const { Router } = require("express");

const { registerUser, loginUser, updateUser } = require("./user.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", validateJWT, updateUser);

module.exports = router;
