const { response, request } = require("express");
const WishList = require("../models/wishlist.model");
const Product = require("../models/product.model");

const getWishList = async (req = request, res = response) => {
    const client = req.uid;
    try {
        const wishlist = await WishList.findOne({ client })
            .populate("products", "name cover price category stars varieties")
            .sort({ createdAt: -1 });
        if (!wishlist) {
            return res.status(404).json({
                ok: false,
                wishlist: {},
            });
        }
        res.json({
            ok: true,
            wishlist,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const addProductToWishList = async (req = request, res = response) => {
    const client = req.uid;
    const addProduct = req.body;
    try {
        let newWishList = {};
        const existWishList = await WishList.findOne({ client });
        const prod = await Product.findByIdAndUpdate(addProduct[0], {
            $set: { wishlist: true },
        });
        if (existWishList) {
            newWishList = await WishList.findOneAndUpdate(
                { client },
                {
                    $push: { products: addProduct },
                },
                {
                    new: true,
                }
            );
        } else {
            const wish = new WishList({ products: addProduct });
            wish.client = client;
            newWishList = await wish.save();
        }

        res.json({
            ok: true,
            msg: "Se agrego tu producto a la lista de deseos",
            // wishlist: newWishList,
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
    getWishList,
    addProductToWishList,
};
