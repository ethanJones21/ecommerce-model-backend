const { Router } = require("express");

const {
    getReviewsByClient,
    getReviewsByProduct,
    getReview,
    createReview,
    updateReview,
} = require("./review.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getReviewsByClient);
router.get("/product/:productID", getReviewsByProduct);
router.get("/:id", validateJWT, getReview);

router.post("/", validateJWT, createReview);
router.put("/:id", validateJWT, updateReview);

module.exports = router;
