const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("*", (req, res)=> {
    res.status(500).json({msg:"Requested URL API is not founded"});
});

app.listen(3000, console.log("Server is running at the port 3000"));