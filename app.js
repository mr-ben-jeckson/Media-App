require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json());

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
    err.status = err.sattus || 200;
    res.status(err.status).json({
        cons: false,
        msg: err.message
    });
});

app.get("*", (req, res)=> {
    res.status(500).json({msg:"Requested URL API is not founded"});
});

app.listen(process.env.PORT, console.log(`Server is running at the port ${process.env.PORT}`));