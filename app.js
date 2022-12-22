require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(fileUpload());

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const { saveFile } = require('./utils/gallery');

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

app.post('/gallery', saveFile, (req, res, next) =>{
    res.status(200).json({msg:"File upload successfully", "filename": req.imageName});
});
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