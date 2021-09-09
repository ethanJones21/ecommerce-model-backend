"use strict";
const { Schema, model } = require("mongoose");

const SaleDetailSchema = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        sale: { type: Schema.Types.ObjectId, ref: "Sale" },
        subtotal: { type: Number, required: true },
        amount: { type: Number, required: true },
        variety: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "sale-details" }
);

SaleDetailSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("SaleDetail", SaleDetailSchema);
