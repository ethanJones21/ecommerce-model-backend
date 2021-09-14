const { response, request } = require("express");
const Review = require("../../../shared/models/review.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getReviewsByClient = async (req = request, res = response) => {
    const client = req.uid;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let reviews = {
        reviews: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Review.find({
            client,
        }).countDocuments();
        reviews.longitud = longitud;
        reviews.reviews = await Review.find({
            client,
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        reviews.pages = fillPagesArr(lengthArr);

        reviews.previous = conditionPrevious(startIndex, page, limit);
        reviews.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            reviews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getReviewsByProduct = async (req = request, res = response) => {
    const product = req.params.productID;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let reviews = {
        reviews: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Review.find({
            product,
        }).countDocuments();

        reviews.longitud = longitud;
        reviews.reviews = await Review.find({
            product,
        })
            .populate("client", "name lastname perfil")
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        reviews.pages = fillPagesArr(lengthArr);

        reviews.previous = conditionPrevious(startIndex, page, limit);
        reviews.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            reviews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getReview = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const review = await Review.findById(id);
        res.json({
            ok: true,
            review,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createReview = async (req = request, res = response) => {
    const client = req.uid;
    const addReview = req.body;

    try {
        const newReview = new Review(addReview);
        newReview.client = client;
        await newReview.save();
        res.json({
            ok: true,
            msg: "Reseña creada",
            product: newReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateReview = async (req = request, res = response) => {
    const addReview = req.body;
    const id = req.params.id;
    try {
        const existReview = await Review.findById(id);
        if (!existReview) {
            res.status(404).json({
                ok: true,
                msg: "Reseña no encontrada por id",
                client: {},
            });
        }

        const newReview = await Review.findByIdAndUpdate(id, addReview, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Reseña actualizada",
            review: newReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    getReviewsByClient,
    getReviewsByProduct,
    getReview,
    createReview,
    updateReview,
};
