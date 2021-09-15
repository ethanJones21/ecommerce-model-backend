"use strict";
const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: false },
        galery: [{ type: Object, required: false }],
        varieties: [{ type: Object, required: false }],
        cover: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        stock: { type: Number, required: true },
        nsales: { type: Number, default: 0, required: true },
        stars: { type: Number, default: 0, required: true },
        category: { type: String, required: true },
        state: { type: String, default: "Edicion", required: true },
        active: { type: Boolean, default: true, required: true },
        wishlist: { type: Boolean, default: false, required: true },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "products" }
);

ProductSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = models.Product || model("Product", ProductSchema);
