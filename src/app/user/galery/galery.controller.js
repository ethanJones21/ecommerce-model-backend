const { response, request } = require("express");
const Product = require("../../../shared/models/product.model");
const { nanoid } = require("nanoid");
const path = require("path");
const {
    deleteBeforeFile,
} = require("../../../shared/helpers/delete-file.helper");

const getGalery = async (req = request, res = response) => {
    const productID = req.params.productID;
    try {
        const { galery } = await Product.findById(productID);
        res.json({
            ok: true,
            galery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateGalery = async (req = request, res = response) => {
    const productID = req.params.productID;
    try {
        let gals = req.files.galery;
        let galeryArr = [];
        gals.forEach((gal, i) => {
            galeryArr[i] = {
                id: nanoid(),
                name: gal.path.split("\\")[2],
            };
        });
        const newProduct = await Product.findByIdAndUpdate(
            productID,
            {
                $push: { galery: galeryArr },
            },
            {
                new: true,
            }
        );

        res.json({
            ok: true,
            msg: "Galeria creada",
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

const deleteImgOfGalery = async (req = request, res = response) => {
    const id = req.params.galeryID;
    const productID = req.params.productID;
    try {
        const { galery } = await Product.findById(productID);
        if (!galery) {
            return res.status(404).json({
                ok: true,
                msg: "Producto no encontrado por id",
                product: {},
            });
        }

        const indice = galery.findIndex((galery) => galery.id === id);

        const pathImg = path.join(
            __dirname,
            `../../../uploads/products/${galery[indice].name}`
        );
        await deleteBeforeFile(res, pathImg);

        if (indice != -1) {
            await Product.findByIdAndUpdate(productID, {
                $pull: { galery: galery[indice] },
            });
        }
        res.json({
            ok: true,
            msg: "Imagen eliminada",
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
    getGalery,
    updateGalery,
    deleteImgOfGalery,
};
