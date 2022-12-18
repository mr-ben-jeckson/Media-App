const DB = require('../dbs/users');
const Helper = require('../utils/helper');

const all = async(req, res, next) => {
    let user = await DB.find();
    Helper.Fmsg(res, "All Users", user);
}
const get = async(req, res, next) => {
    let id = req.params.id;
    let user = await DB.findById(id);
    Helper.Fmsg(res, "Single User Get", user);
}
const add = async(req, res, next) => {
    let saveUser = new DB(req.body);
    let result = await saveUser.save();
    Helper.Fmsg(res, "Add User", result);
}

const patch = async(req, res, next) => {
    let user = await DB.findById(req.params.id);
    if(user) {
        await DB.findByIdAndUpdate(user._id, req.body);
        let retUser = await DB.findById(user._id);
        Helper.Fmsg(res, "Updated User", retUser);
    } else {
        next(new Error("Error, No User with that id"));
    }
}
const drop = async(req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.Fmsg(res, "User Deleted");
}
module.exports = {
    all,
    get,
    add,
    patch,
    drop
}