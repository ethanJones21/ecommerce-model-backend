const { Router } = require("express");

const {
    getVarieties,
    createVariety,
    updateVariety,
    deleteVariety,
} = require("./variety.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const { validateUSER } = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/:productID", [validateJWT, validateUSER], getVarieties);

router.post("/:productID", [validateJWT, validateUSER], createVariety);
router.put("/:productID", [validateJWT, validateUSER], updateVariety);
router.delete(
    "/:productID/:varietyID",
    [validateJWT, validateUSER],
    deleteVariety
);

module.exports = router;
