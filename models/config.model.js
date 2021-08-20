"use strict";
const { Schema, model } = require("mongoose");

const ConfigSchema = new Schema(
    {
        title: { type: String, required: true },
        categories: [{ type: Object, required: true }],
        logo: { type: String, required: true },
        serie: { type: String, required: true },
        correlative: { type: String, required: true },
    },
    { collection: "configs" }
);

ConfigSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Config", ConfigSchema);
