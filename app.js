// config
require('dotenv').config();

// For Path Public
const path = require("path");

// Using Express
const express = require("express");
const app = express();

// Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

// Upload Files Package
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const { saveFile, saveFiles, deleteFile } = require('./utils/gallery');

// const funcky = (req, res, next)=>{
//     console.log(req.warningMsg);
//     res.json({msg:"Coming with Middleware"});
// };

// const isLoggedin = (req, res, next)=> {
//     if(1+1 == 2) {
//         req.sucessMsg = "We are good to go";
//         next();
//     } else {
//         next(new Error("You are not logged in"));
//     }
// }

// const isAdmin = (req, res, next)=> {
//     if( 4 == 4) {
//         console.log(req.sucessMsg);
//         req.warningMsg = "This is warning message";
//         next();
//     } else {
//         next(new Error("Only admin can view this route"));
//     }
// }

// app.get("/users", isLoggedin, isAdmin, funcky);

app.post('/gallery', async(req, res, next) =>{
    await deleteFile(req.body.name);
    res.status(200).json({msg:"File Deleted"});
});
app.use("/users", userRoute);
app.use("/posts", postRoute);

// Error Handling
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