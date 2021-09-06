const { response, request } = require("express");
const Cart = require("../models/cart.model");

// .populate({
//     path: "products",
//     populate: {
//         path: "product",
//     },
// });

const getCart = async (req = request, res = response) => {
    const cartID = req.params.cartID;
    try {
        const cart = await Cart.findById(cartID).populate(
            "products.product",
            "name cover subtotal price category stars"
        );
        if (!cart) {
            return res.status(404).json({
                ok: false,
                cart: {},
            });
        }
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
    const cartID = req.params.cartID;
    const addProduct = req.body;
    try {
        let newCart = {};
        if (cartID != "123") {
            const existCart = await Cart.findById(cartID);
            const { _id } = existCart;
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
            msg: "Se agrego tu producto al carrito",
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
