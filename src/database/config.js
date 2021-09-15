const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_RUTE_DEV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("DB online");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la BD ver logs");
    }
};

module.exports = {
    dbConnection,
};
