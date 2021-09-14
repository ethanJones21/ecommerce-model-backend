"use strict";
const { Schema, model } = require("mongoose");

const AddressSchema = new Schema(
    {
        addressee: { type: String, required: true },
        dni: { type: String, required: true },
        zip: { type: Number, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        region: { type: String, required: false },
        province: { type: String, required: false },
        phone: { type: String, required: true },
        principal: { type: Boolean, default: true, required: true },
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "products" }
);

AddressSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Product", AddressSchema);
