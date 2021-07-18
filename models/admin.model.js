"use strict";
const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        pais: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        perfil: { type: String, default: "perfil.png", required: true },
        telefono: { type: String, required: false },
        rol: {
            type: "Admin" || "Superusuario" || "Trabajador" || "Tester",
            default: "Trabajador",
            required: true,
        },
        fnacimiento: { type: String, required: false },
        dni: { type: String, required: false },
        activo: { type: Boolean, default: true, required: true },
    },
    { collection: "admins" }
);

AdminSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Admin", AdminSchema);
