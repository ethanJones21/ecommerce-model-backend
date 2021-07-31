const { Router } = require("express");
const {
    registerUser,
    loginUser,
} = require("../controllers/user-auth.controller");

const router = Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);

module.exports = router;
