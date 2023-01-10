const DB = require("../models/tag");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
    let tags = await DB.find();
    Helper.Fmsg(res, "All Tags", tags);
}

const get = async(req, res, next) => {
    let result = await DB.findById(req.params.id);
    if(result) {
        Helper.Fmsg(res, "Single Tag", result);
    } else {
        next(new Error("No tag with that id"));
    }
}

const add = async (req, res, next) => {
    let dbTag = await DB.findOne({ name: req.body.name });
    if (dbTag) {
        next(new Error("Tag Name is already in use"));
    } else {
        let result = await new DB(req.body).save();
        Helper.Fmsg(res, "new Tag Saved", result);
    }

}

const patch = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if (tag) {
        await DB.findByIdAndUpdate(tag._id, req.body);
        let result = await DB.findById(tag._id);
        Helper.Fmsg(res, "Updated Tag", result);
    } else {
        next(new Error("No Tag with that Id"));
    }
}

const drop = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if (tag) {
        await DB.findByIdAndDelete(tag._id);
        Helper.Fmsg(res, "Deleted Tag");
    } else {
        next(new Error("No Tag with that Id"));
    }
}

module.exports = {
    all,
    get,
    add,
    patch,
    drop
}