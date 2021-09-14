const { response, request } = require("express");
const Product = require("../../../shared/models/product.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getProductsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let products = {
        products: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Product.find({
            $or: [{ name: regex }, { category: regex }],
        }).countDocuments();
        products.longitud = longitud;
        products.products = await Product.find({
            $or: [{ name: regex }, { category: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        products.pages = fillPagesArr(lengthArr);

        products.previous = conditionPrevious(startIndex, page, limit);
        products.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getProduct = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.json({
            ok: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getProductBySlug = async (req = request, res = response) => {
    const slug = req.params.slug;
    try {
        const product = await Product.findOne({ slug });
        res.json({
            ok: true,
            product,
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
    getProductsByPage,
    getProduct,
    getProductBySlug,
};
