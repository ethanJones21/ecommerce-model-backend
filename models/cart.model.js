"use strict";
const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
    {
        state: { type: String, required: true, default: "Edicion" },
        client: { type: Schema.Types.ObjectId, ref: "Client" },
        products: [
            // si lo pongo asi se crea automaticamente un id
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                amount: { type: Number, required: true },
                varieties: [{ type: Object, required: true }],
            },
        ],
    },
    { collection: "carts" }
);

CartSchema.method("toJSON", function () {
    const { __v, _id, client, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Cart", CartSchema);

// {
//     type: Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
// },
