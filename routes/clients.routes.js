const { Router } = require("express");
const {
    registerClient,
    loginClient,
} = require("../controllers/clients/clients-auth.controller");

const {
    getClientsByPage,
    getClient,
    updateClient,
    deactivateClient,
} = require("../controllers/clients/clients.controller");

const router = Router();

router.get("/paginado", getClientsByPage);
router.get("/:id", getClient);

router.post("/register", registerClient);
router.post("/login", loginClient);

router.put("/:id", updateClient);
router.patch("/:id", deactivateClient);

module.exports = router;
