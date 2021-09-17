const { Router } = require("express");

const {
    getInventoriesByPage,
    createInventory,
    updateInventory,
    deleteInventory,
} = require("./inventory.controller");

const router = Router();

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

router.get(
    "/:productID/paginado",
    [validateJWT, validateUSER_or_ADMIN],
    getInventoriesByPage
);

router.post(
    "/:productID",
    [validateJWT, validateUSER_or_ADMIN],
    createInventory
);
router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateInventory);
router.delete("/:id", [validateJWT, validateUSER_or_ADMIN], deleteInventory);

module.exports = router;
