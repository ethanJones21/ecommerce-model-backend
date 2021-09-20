const { Router } = require("express");

const {
    getUsersByPage,
    getUser,
    updateUser,
    deactivateUser,
    createUser,
} = require("./user.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateADMIN], getUsersByPage);
router.get("/:id", [validateJWT, validateADMIN], getUser);

router.post("/", [validateJWT, validateADMIN], createUser);
router.put("/:id", [validateJWT, validateADMIN], updateUser);
router.patch("/:id", [validateJWT, validateADMIN], deactivateUser);

module.exports = router;
