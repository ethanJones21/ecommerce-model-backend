"use strict";
const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        products: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                amount: { type: Number, required: true },
            },
        ],
        amounts: [{ type: Number, required: true }],
    },
    { collection: "carts" }
);

CartSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Cart", CartSchema);
