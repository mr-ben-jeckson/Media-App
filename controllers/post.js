const DB = require('../models/posts');
const commentDB = require('../models/comment');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let posts = await DB.find();
    Helper.Fmsg(res, "All Posts", posts);
}

const get = async (req, res, next) => {
    let post = await DB.findById(req.params.id).populate('user tag', '-__v -_id -created');
    if (post) {
        let comments = await commentDB.find({ postId: post._id });
        post = post.toObject();
        post.comments = comments;
        Helper.Fmsg(res, "Single Post", post);
    } else {
        next(new Error("No post with that ID"));
    }
}

const toggleLike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        let action = '';
        if (req.params.page == 1 || req.params.page == "true") {
            action = "Like Added";
            post.like = post.like + 1;
        }
        else {
            action = "Like Removed";
            post.like = post.like - 1;
        }
        await DB.findByIdAndUpdate(post._id, post)
        let result = await DB.findById(post._id);
        Helper.Fmsg(res, action, result);
    } else {
        next(new Error("no post with that id"));
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

const byUserId = async (req, res, next) => {
    let posts = await DB.find({ user: req.params.id }).populate('user');
    Helper.Fmsg(res, "All Posts by User", posts);
}

const byTagId = async (req, res, next) => {
    let posts = await DB.find({ tag: req.params.id });
    if (posts) {
        Helper.Fmsg(res, 'All Posts by Tag', posts);
    } else {
        next(new Error("No Posts with that id"));
    }
}

const paginate = async (req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit);
    Helper.Fmsg(res, "Paginated Posts", posts);
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCatId,
    byUserId,
    byTagId,
    toggleLike,
    paginate
}