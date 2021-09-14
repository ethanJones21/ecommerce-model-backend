"use strict";
const { Schema, model } = require("mongoose");

const WishListSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client" },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        ],
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { collection: "wishlist" }
);

WishListSchema.method("toJSON", function () {
    const { __v, _id, client, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("WishList", WishListSchema);
