const { response, request } = require("express");
const Sale = require("../../../shared/models/sale.model");
const SaleDetail = require("../../../shared/models/sale-detail.model");

const totalSales = async (req = request, res = response) => {
    try {
        const totalA = await Sale.find({}, { total: 1, _id: 0 });
        const totalB = [];
        let total = 0;
        totalA.forEach((t, i) => {
            totalB[i] = t.total;
        });
        totalB.forEach((t) => (total += t));
        res.json({
            ok: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const totalSalesByMonth = async (req = request, res = response) => {
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const year_month = `${year}-${month}`;
    try {
        const fecha_total = await Sale.find(
            {},
            { createdAt: 1, total: 2, _id: 0 }
        );
        let total = 0;

        fecha_total.forEach((f) => {
            const monthf = Number(f.createdAt.toJSON().split("-")[1]);
            const yearf = Number(f.createdAt.toJSON().split("-")[0]);
            const y_m = `${yearf}-${monthf}`;
            if (y_m === year_month) total += f.total;
        });

        // let monthAux = [];
        // fecha y el total lo iteramos y sacamos los numeros de todos los meses que tiene
        // aqui falta el año tambien
        // fecha_total.forEach((f, i) => {
        //     const fecha = f.createdAt.toJSON();
        //     monthAux[i] = Number(fecha.split("-")[1]);
        // });
        // aqui iteramos estos meses que capturamos anteriormente [8,8,9]
        // si el mes es agosto => 8 entonces total = total + fecha_total[i].total;
        // monthAux.forEach((m, i) => {
        //     if (m === month) total += fecha_total[i].total;
        // });
        res.json({
            ok: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

// graph indica grafico y las palabras siguientes indican eje x y eje y
const graphSaleXMonth = async (req = request, res = response) => {
    const year = Number(req.params.year);
    try {
        const monthNames = [
            "",
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const fecha_total = await Sale.find(
            {},
            { createdAt: 1, total: 2, _id: 0 }
        );
        let series = [];

        fecha_total.forEach((f, i) => {
            const monthf = Number(f.createdAt.toJSON().split("-")[1]);
            const yearf = Number(f.createdAt.toJSON().split("-")[0]);
            if (yearf === year) {
                series[i] = {
                    name: monthNames[monthf],
                    value: f.total,
                };
            }
        });
        let dup = [];
        let nuevoObjeto = {};
        series.forEach((d, i, ds) => {
            dup[i] = d.value; //200
            if (!nuevoObjeto.hasOwnProperty(d.name)) {
                nuevoObjeto[d.name] = dup[i];
            } else {
                nuevoObjeto[ds[i - 1].name] = dup[i - 1] + dup[i];
            }
        });
        Object.keys(nuevoObjeto).forEach((k, i) => (series[i].name = k));
        Object.values(nuevoObjeto).forEach((k, i) => (series[i].value = k));
        const lengthborrar = Number(
            series.length - Object.keys(nuevoObjeto).length
        );
        for (let i = 0; i < lengthborrar; i++) {
            series.pop();
        }

        res.json({
            ok: true,
            series,
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
    totalSales,
    totalSalesByMonth,
    graphSaleXMonth,
};
