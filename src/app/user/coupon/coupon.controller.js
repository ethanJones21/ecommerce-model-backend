const { response, request } = require("express");
const Coupon = require("../../../shared/models/coupon.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getCouponsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let coupons = {
        coupons: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Coupon.find({
            $or: [{ code: regex }, { type: regex }],
        }).countDocuments();
        coupons.longitud = longitud;
        coupons.coupons = await Coupon.find({
            $or: [{ code: regex }, { type: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        coupons.pages = fillPagesArr(lengthArr);

        coupons.previous = conditionPrevious(startIndex, page, limit);
        coupons.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            coupons,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getCoupon = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const coupon = await Coupon.findById(id);
        res.json({
            ok: true,
            coupon,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createCoupon = async (req = request, res = response) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();

        res.json({
            ok: true,
            msg: "Cupon de creado",
            coupon,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateCoupon = async (req = request, res = response) => {
    const newCoupon = req.body;
    const id = req.params.id;
    try {
        const searchID = await Coupon.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Cupon no encontrado por id",
                coupon: {},
            });
        }

        const coupon = await Coupon.findByIdAndUpdate(id, newCoupon, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Cupon actualizado",
            coupon,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteCoupon = async (req = request, res = Response) => {
    const id = req.params.id;
    try {
        await Coupon.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Cupon eliminado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    getCouponsByPage,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
};
