const { request, response } = require("express");
const Inventory = require("../../../shared/models/inventory.model");
const Product = require("../../../shared/models/product.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getInventoriesByPage = async (req = request, res = response) => {
    const product = req.params.productID;
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let inventories = {
        inventories: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Inventory.find({
            supplier: regex,
            product,
        }).countDocuments();
        inventories.longitud = longitud;
        inventories.inventories = await Inventory.find({
            supplier: regex,
            product,
        })
            .populate("user", "name")
            .limit(limit)
            .skip(startIndex)
            .sort({ createdAt: -1 });

        const lengthArr = Math.ceil(longitud / limit);
        inventories.pages = fillPagesArr(lengthArr);

        inventories.previous = conditionPrevious(startIndex, page, limit);
        inventories.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            inventories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createInventory = async (req = request, res = response) => {
    const productID = req.params.productID;
    const { total, supplier } = req.body;
    const uid = req.uid;
    try {
        const { stock } = await Product.findById(productID);
        const newStock_a = stock + total;
        const newStock = { $set: { stock: newStock_a } };
        await Product.findByIdAndUpdate(productID, newStock);

        const inventory = new Inventory({
            product: productID,
            total,
            user: uid,
            supplier,
        });
        await inventory.save();
        res.status(200).json({
            ok: true,
            msg: "Se agrego nuevo stock al producto",
            inventory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateInventory = async (req = request, res = response) => {
    const newInventory = req.body;
    const id = req.params.id;
    try {
        const searchID = await Inventory.findById(id);
        if (!searchID) {
            res.status(404).json({
                ok: true,
                msg: "Producto no encontrado por id",
                client: {},
            });
        }
        const inventory = await Inventory.findByIdAndUpdate(id, newInventory, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Inventario actualizado",
            inventory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteInventory = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const { product: productID, total } = await Inventory.findById(id);
        const { stock } = await Product.findById(productID);
        const newStock_a = stock - total;
        const newStock = { $set: { stock: newStock_a } };
        await Product.findByIdAndUpdate(productID, newStock);
        await Inventory.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: "Se eliminio del inventario del producto",
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
    getInventoriesByPage,
    createInventory,
    updateInventory,
    deleteInventory,
};
