"use strict";
const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        review: { type: String, required: true },
        stars: { type: Number, required: true },
        venta: { type: Number, required: true },
    },
    { collection: "reviews" }
);

ReviewSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Review", ReviewSchema);
