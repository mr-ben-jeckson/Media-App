const DB = require('../models/cat');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let cats = await DB.find();
    Helper.Fmsg(res, "All Categories", cats);
};

const add = async (req, res, next) => {
    // DB uniqued name testing
    let dbCat = await DB.findOne({ name: req.body.name });
    if (dbCat) {
        next(new Error("Category Name exits already"));
        return;
    }
    let result = await new DB(req.body).save();
    Helper.Fmsg(res, "Category Saved", result);
};

const get = async (req, res, next) => {
    let cat = await DB.findById(req.params.id);
    Helper.Fmsg(res, "Single Category", cat);
}

const patch = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if(dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body);
        let result = await DB.findById(req.params.id);
        Helper.Fmsg(res, "Category Updated", result);
    } else {
        next(new Error("No category with that id"));
    }
}

const drop = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if(dbCat) {
        await DB.findByIdAndDelete(dbCat._id);
        Helper.Fmsg(res, "Category Deleted")
    } else {
        next(new Error("No category with that id"));
    }
}

module.exports = {
    all,
    get,
    patch,
    drop,
    add
}
