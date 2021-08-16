const { Router } = require("express");

const {
    getInventoriesByPage,
    createInventory,
    updateInventory,
    deleteInventory,
} = require("../controllers/inventory.controller");

const router = Router();

const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const { validateADMIN } = require("../middlewares/role.middleware");

router.get(
    "/:productID/paginado",
    [validateJWT, validateADMIN],
    getInventoriesByPage
);

router.post("/:productID", [validateJWT, validateADMIN], createInventory);
router.put("/:id", [validateJWT, validateADMIN], updateInventory);
router.delete("/:id", [validateJWT, validateADMIN], deleteInventory);

module.exports = router;
