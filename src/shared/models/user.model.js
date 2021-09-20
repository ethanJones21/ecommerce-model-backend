"use strict";
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        country: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profile: { type: String, default: "perfil.png", required: true },
        phone: { type: String, required: false },
        gender: { type: String, required: true },
        role: {
            type: String,
            default: "USER",
            required: true,
        },
        birthday: { type: String, required: false },
        dni: { type: String, required: false },
        active: { type: Boolean, default: true, required: true },
    },
    { collection: "users" }
);

UserSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("User", UserSchema);
