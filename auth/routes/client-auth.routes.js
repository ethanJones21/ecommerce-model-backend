const { Router } = require("express");
const {
    registerClient,
    loginClient,
} = require("../controllers/client-auth.controller");

const router = Router();

router.post("/register", registerClient);
router.post("/login", loginClient);

module.exports = router;
