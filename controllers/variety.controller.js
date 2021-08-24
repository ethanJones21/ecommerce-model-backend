const { response, request } = require("express");
const Product = require("../models/product.model");

const getVarieties = async (req = request, res = response) => {
    const productID = req.params.productID;
    try {
        const { varieties } = await Product.findById(productID);
        res.json({
            ok: true,
            varieties,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createVariety = async (req = request, res = response) => {
    const variety = req.body;
    const productID = req.params.productID;
    try {
        const newProduct = await Product.findByIdAndUpdate(productID, {
            $push: { varieties: variety },
        });

        res.json({
            ok: true,
            msg: "Variedad creada",
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

const updateVariety = async (req = request, res = response) => {
    const { id } = req.body;
    const productID = req.params.productID;
    try {
        // const p = await Product.updateOne(
        //     { _id: productID, "varieties.id": id },
        //     // { "varieties.$": req.body }
        //     { $set: { "varieties.$.title": title } },
        //     (error, doc) => {
        //         console.log(error);
        //     }
        // );

        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({
                ok: true,
                msg: "Producto no encontrado por id",
                product: {},
            });
        }

        const indice = product.varieties.findIndex(
            (variety) => variety.id === id
        );

        let newProduct = {};

        if (indice != -1) {
            product.varieties[indice] = req.body;
            newProduct = await Product.findByIdAndUpdate(productID, {
                $set: { varieties: product.varieties },
            });
        }

        res.json({
            ok: true,
            msg: "Variedad actualizada",
            varieties: newProduct.varieties,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteVariety = async (req = request, res = response) => {
    const id = req.params.varietyID;
    const productID = req.params.productID;
    try {
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({
                ok: true,
                msg: "Producto no encontrado por id",
                product: {},
            });
        }

        const indice = product.varieties.findIndex(
            (variety) => variety.id === id
        );

        if (indice != -1) {
            // delete product.varieties[indice];
            // console.log(product);
            // await Product.findByIdAndUpdate(productID, {
            //     $set: { varieties: product.varieties },
            // });
            await Product.findByIdAndUpdate(productID, {
                $pull: { varieties: product.varieties[indice] },
            });
        }

        res.json({
            ok: true,
            msg: "Variedad eliminada",
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
    getVarieties,
    createVariety,
    updateVariety,
    deleteVariety,
};
