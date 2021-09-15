const { Router } = require("express");

const { registerUser, loginUser, updateUser } = require("./user.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const {
    validateADMIN_or_SAME_USER,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", [validateJWT, validateADMIN_or_SAME_USER], updateUser);

module.exports = router;
