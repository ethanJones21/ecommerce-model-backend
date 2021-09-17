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

const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/:productID", [validateJWT, validateUSER_or_ADMIN], getVarieties);

router.post("/:productID", [validateJWT, validateUSER_or_ADMIN], createVariety);
router.put("/:productID", [validateJWT, validateUSER_or_ADMIN], updateVariety);
router.delete(
    "/:productID/:varietyID",
    [validateJWT, validateUSER_or_ADMIN],
    deleteVariety
);

module.exports = router;
