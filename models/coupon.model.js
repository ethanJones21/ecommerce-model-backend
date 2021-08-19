"use strict";
const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
    code: { type: String, required: true },
    type: { type: String, required: true }, //porcentaje o precio fijo
    value: { type: Number, required: true },
    limit: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

CouponSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Coupon", CouponSchema);
