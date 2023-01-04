const DB = require('../models/posts');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let posts = await DB.find();
    Helper.Fmsg(res, "All Posts", posts);
}
const get = async (req, res, next) => {
    let post = await DB.findById(req.params.id).populate('user','-password -__v');
    if(post) {
        Helper.Fmsg(res, "Single Post", post);
    } else {
        next(new Error("No post with that ID")); 
    }
}

const post = async (req, res, next) => {
    let result = await new DB(req.body).save();
    Helper.Fmsg(res, "Post Created", result);
}

const patch = async (req, res, next) => {
    res.json({msg:"Patch Post"});
}
const drop = async (req, res, next) => {
    res.json({msg:"Delete Post"});
}
module.exports = {
    all,
    get,
    post,
    patch,
    drop
}