"use strict";
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        galery: [{ type: Object, required: false }],
        cover: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        stock: { type: Number, required: true },
        nsales: { type: Number, default: 0, required: true },
        stars: { type: Number, default: 0, required: true },
        category: { type: Number, required: true },
        state: { type: String, default: "Edicion", required: true },
        active: { type: Boolean, default: true, required: true },
        test: { type: Boolean, default: false, required: true },
    },
    { collection: "products" }
);

ProductSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Product", ProductSchema);
