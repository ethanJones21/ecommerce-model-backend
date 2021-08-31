const { response, request } = require("express");
const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");
const { deleteBeforeFile } = require("../helpers/delete-file.helper");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../helpers/pages.helper");
const path = require("path");

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

const createProduct = async (req = request, res = response) => {
    const newProduct = new Product(req.body);
    const uid = req.uid;
    let path_a = req.files.cover.path;

    try {
        const newInventory = new Inventory({
            product: newProduct.id,
            total: newProduct.stock,
            user: uid,
            proveedor: "No tiene proveedor",
        });
        await newInventory.save();
        // Producto
        newProduct.cover = path_a.split("\\")[2];
        newProduct.slug = newProduct.name.toLowerCase().replace(/ /g, "-");
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
    const newProduct_a = req.body;
    const id = req.params.id;
    try {
        const searchID = await Product.findById(id);
        if (!searchID) {
            res.status(404).json({
                ok: true,
                msg: "Producto no encontrado por id",
                client: {},
            });
        }

        let path_a = req.files.cover.path;
        path_a = path_a.split("\\")[2];

        if (path_a != searchID.cover) {
            const pathImg = path.join(
                __dirname,
                `../uploads/products/${searchID.cover}`
            );
            await deleteBeforeFile(res, pathImg);
            newProduct_a.cover = path_a;
        }

        // sin el {new:true} te devuelve el anterior
        const newProduct = await Product.findByIdAndUpdate(id, newProduct_a, {
            new: true,
        });
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
    const { active } = req.body;
    const inactive = { $set: { active } };
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
