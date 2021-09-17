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
                link: "/panel/admins/home",
                icon: "cxi-home",
            },
            {
                title: "Productos",
                link: "/panel/products",
                icon: "cxi-hanger",
            },
            {
                title: "Cupones",
                link: "/panel/coupons",
                icon: "cxi-heart-filled",
            },
            {
                title: "Mensajes",
                link: "/panel/messages",
                icon: "cxi-envelope-opened",
            },
            { title: "Pedidos", link: "/panel/orders", icon: "cxi-paypal" },
            {
                title: "Usuarios",
                link: "/panel/admins/users",
                icon: "cxi-lock",
            },
            {
                title: "Clientes",
                link: "/panel/admins/clients",
                icon: "cxi-odnoklassniki",
            },
            {
                title: "Configuraciones",
                link: "/panel/admins/settings",
                icon: "cxi-settings",
            },
        ];

        if (usuarioDB.role === "USER") {
            const delTitles = [
                "Inicio",
                "Configuraciones",
                "Usuarios",
                "Clientes",
            ];
            removeElementFromArray(sidebarArr, delTitles);
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

const removeElementFromArray = (arr, titles) => {
    for (const title of titles) {
        const indice = arr.findIndex((a) => a.title === title);
        arr.splice(indice, 1);
    }
};

module.exports = {
    sidebar,
};
