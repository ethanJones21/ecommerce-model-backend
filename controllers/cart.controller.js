const { response, request } = require("express");
const Cart = require("../models/cart.model");

const getCart = async (req = request, res = response) => {
    const client = req.uid;
    console.log(client);
    try {
        const cart = await Cart.find({ client, state: "Edicion" }).populate(
            "products.product",
            "name cover subtotal price category stars"
        );
        // .populate({
        //     path: "products",
        //     populate: {
        //         path: "product",
        //     },
        // });
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
    const client = req.uid;
    const addProduct = req.body;
    addProduct.client = client;
    try {
        let newCart = {};
        const existCart = await Cart.find({ client });
        if (existCart.length > 0) {
            const { _id } = existCart[0];
            newCart = await Cart.findByIdAndUpdate(
                _id,
                {
                    $push: { products: addProduct.products },
                },
                {
                    new: true,
                }
            );
        } else {
            const cart = new Cart(addProduct);
            newCart = await cart.save();
        }

        res.json({
            ok: true,
            msg: "Producto agregado al carrito",
            cart: newCart,
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
        const indice = products.findIndex(
            ({ product }) => product == productID
        );
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
