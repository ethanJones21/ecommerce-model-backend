const { response, request } = require("express");
const Cart = require("../models/cart.model");

const getCart = async (req = request, res = response) => {
    const client = req.params.clientID;
    try {
        const cart = await Cart.find({ client });
        res.json({
            ok: true,
            cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const addProductToCart = async (req = request, res = response) => {
    const client = req.params.clientID;
    const addProduct = req.body;
    try {
        const existCart = await Cart.find({ client });
        if (existCart) {
            const { _id: cartID } = existCart;
            await Cart.findByIdAndUpdate(cartID, addProduct);
        } else {
            const cart = new Cart(addProduct);
            await cart.save();
        }

        res.json({
            ok: true,
            msg: "Producto agregado al carrito",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteProductOfCart = async (req = request, res = Response) => {
    const productID = req.params.productID;
    const cartID = req.params.cartID;
    try {
        const { products } = await Cart.findById(cartID);

        const indice = products.findIndex((product) => product === productID);

        await Cart.findByIdAndUpdate(cartID, {
            $pull: { products: products[indice] },
        });
        res.json({
            ok: true,
            msg: "Producto eliminado del carrito",
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
    getCart,
    addProductToCart,
    deleteProductOfCart,
};
