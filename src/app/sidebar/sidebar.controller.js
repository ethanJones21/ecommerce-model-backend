const User = require("../../shared/models/user.model");
const { request, response } = require("express");

const sidebar = async (req = request, res = response) => {
    const uid = req.uid;

    try {
        const usuarioDB = await User.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        const sidebarArr = [
            {
                title: "Inicio",
                link: "/panel/admin/home",
                icon: "cxi-cart",
            },
            {
                title: "Productos",
                link: "/panel/products",
                icon: "ci-hanger",
            },
            { title: "Cupones", link: "/panel/coupons", icon: "cxi-cart" },
            { title: "Mensajes", link: "/panel/messages", icon: "cxi-cart" },
            { title: "Ventas", link: "/panel/sales", icon: "cxi-cart" },
            {
                title: "Usuarios",
                link: "/panel/admins/users",
                icon: "cxi-cart",
            },
            {
                title: "Clientes",
                link: "/panel/admins/clients",
                icon: "cxi-cart",
            },
            {
                title: "Configuraciones",
                link: "/panel/admins/settings",
                icon: "ci-settings",
            },
        ];

        if (usuarioDB.role === "USER") {
            removeElementFromArray(sidebarArr, "Inicio");
            removeElementFromArray(sidebarArr, "Configuraciones");
            removeElementFromArray(sidebarArr, "Usuarios");
            removeElementFromArray(sidebarArr, "Clientes");
            return res.json({
                ok: true,
                sidebar: sidebarArr,
            });
        } else if (usuarioDB.role === "ADMIN") {
            return res.json({
                ok: true,
                sidebar: sidebarArr,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const removeElementFromArray = (arr, title) => {
    const indice = arr.findIndex((a) => a.title === title);
    delete arr[indice];
};

module.exports = {
    sidebar,
};
