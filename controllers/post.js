const DB = require('../models/posts');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let posts = await DB.find();
    Helper.Fmsg(res, "All Posts", posts);
}
const get = async (req, res, next) => {
    let post = await DB.findById(req.params.id).populate('user', '-password -__v');
    if (post) {
        Helper.Fmsg(res, "Single Post", post);
    } else {
        next(new Error("No post with that ID"));
    }
}

const post = async (req, res, next) => {
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let result = await new DB(req.body).save();
    Helper.Fmsg(res, "Post Added", result);
}

const patch = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndUpdate(post._id, req.body);
        let result = await DB.findById(post._id);
        Helper.Fmsg(res, "Post Updated", result);
    } else {
        next(new Error("No post with that id"));
    }
}
const drop = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndDelete(post._id);
        Helper.Fmsg(res, "Post Deleted");
    } else {
        next(new Error("No post with that id"));
    }
}
const byCatId = async (req, res, next) => {
    let posts = await DB.find({ cat: req.params.id });
    Helper.Fmsg(res, "All Posts by Category", posts);
}
module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCatId
}