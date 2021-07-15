const { Router } = require("express");
const { registroCliente } = require("../controllers/cliente.controller");
const router = Router();

router.post("/registro_cliente", registroCliente);

module.exports = router;
