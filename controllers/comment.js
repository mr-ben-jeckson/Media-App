const DB = require('../models/comment');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let comments = await DB.find({ postId: req.params.id });
    Helper.Fmsg(res, "All Comments for that Post", comments);
}

const add = async (req, res, next) => {
    let result = await new DB(req.body).save();
    Helper.Fmsg(res, "Comment Added", result);
}

const drop = async (req, res, next) => {
    let comment = await DB.findById(req.params.id);
    if (comment) {
        await DB.findByIdAndDelete(comment._id);
        Helper.Fmsg(res, "Comment Deleted");
    } else {
        next(new Error("No comment with that id"));
    }
}

module.exports = {
    add,
    all,
    drop
}