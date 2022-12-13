const path = require("path");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const { router } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/todos", router);

app.use(express.static(path.join(__dirname, "./front-end/build")));

const port = 4000;
app.listen(port, async () => {
    try {
        await connectDB("mongodb://127.0.0.1:27017/mern_g16");
        console.log(`server listening at port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
