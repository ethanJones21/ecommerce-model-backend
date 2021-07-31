const { Router } = require("express");
const {
    registerClient,
    loginClient,
} = require("../controllers/client-auth.controller");

const router = Router();

router.post("/register-client", registerClient);
router.post("/login-client", loginClient);

module.exports = router;
