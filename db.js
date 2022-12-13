const mongoose = require("mongoose");

const connectDB = (uri) => {
    mongoose.set("strictQuery", true);
    return mongoose.connect(uri);
};

module.exports = { connectDB };
