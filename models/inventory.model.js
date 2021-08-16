"use strict";
const { Schema, model } = require("mongoose");

const InventorySchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        total: { type: Number, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        supplier: {
            type: String,
            required: true,
            default: "No tiene proveedor",
        },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { collection: "inventories" }
);

InventorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Inventory", InventorySchema);
