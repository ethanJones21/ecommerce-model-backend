"use strict";
const { Schema, model } = require("mongoose");

const SaleSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client" },
        nsale: { type: String, required: true },
        total: { type: Number, required: true },
        delivery: { type: Object, required: true },
        transaction: { type: String, required: true },
        coupon: { type: String, required: true },
        state: { type: String, required: true },
        address: {
            type: Object,
            required: true,
        },
        phone: { type: String, required: true },
        note: { type: String },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "sales" }
);

SaleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Sale", SaleSchema);
