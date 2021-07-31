const { response, request } = require("express");
const Product = require("../models/product.model");
const bcrypt = require("bcryptjs");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../helpers/pages.helper");

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
            $or: [{ apellido: regex }, { email: regex }],
        }).countDocuments();
        products.longitud = longitud;
        products.products = await Product.find({
            $or: [{ nombre: regex }, { apellido: regex }, { email: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        products.pages = fillPagesArr(lengthArr);

        products.previous = conditionPrevious(startIndex, page, limit);
        products.previous = conditionNext(endIndex, longitud, page, limit);

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

const createProduct = async (req = request, res = response) => {
    const { email, pass } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await Product.findOne({ email });
        if (existEmail) {
            res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo producto
        const newProduct = new Product(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newProduct.pass = bcrypt.hashSync(pass, salt);
        newProduct.test = true;
        // guardar producto
        await newProduct.save();

        res.json({
            ok: true,
            msg: "Producto creado",
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateProduct = async (req = request, res = response) => {
    const nuevaData = req.body;
    const id = req.params.id;
    try {
        const newProduct = await Product.findByIdAndUpdate(id, nuevaData);
        res.json({
            ok: true,
            msg: "Producto actualizado",
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deactivateProduct = async (req = request, res = Response) => {
    const id = req.params.id;
    const inactive = { $set: { active: false } };
    try {
        await Product.findByIdAndUpdate(id, inactive);
        res.json({
            ok: true,
            msg: "Producto inactivo",
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
    createProduct,
    updateProduct,
    deactivateProduct,
};
