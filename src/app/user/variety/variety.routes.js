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

const router = Router();

router.get("/:productID", validateJWT, getVarieties);

router.post("/:productID", validateJWT, createVariety);
router.put("/:productID", validateJWT, updateVariety);
router.delete("/:productID/:varietyID", validateJWT, deleteVariety);

module.exports = router;
