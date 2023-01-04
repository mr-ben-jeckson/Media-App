const DB = require('../models/users');
const Helper = require('../utils/helper');

const login = async (req, res, next) => {
    let phoneUser = await DB.findOne({ phone: req.body.phone }).select('-__v');
    if (phoneUser) {
        if (Helper.comparePass(req.body.password, phoneUser.password)) {
            let user = phoneUser.toObject();
            user.token = Helper.makeToken(user);
            delete user.password;
            Helper.Fmsg(res, "Login Successfully", user);
        } else {
            next(new Error("Creditential does not match in our records"));
        }
    } else {
        next(new Error("Creditential does not match in our records"));
    }
}

const register = async (req, res, next) => {
    let nameUser = await DB.findOne({ name: req.body.name });
    if (nameUser) {
        next(new Error("Name is already taken"));
        return;
    }
    let emailUser = await DB.findOne({ email: req.body.email });
    if (emailUser) {
        next(new Error("Email is already taken"));
        return;
    }
    let phoneUser = await DB.findOne({ phone: req.body.phone });
    if (phoneUser) {
        next(new Error("Phone number is already taken"));
        return;
    }
    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.Fmsg(res, "Register Successfully", result);
}

module.exports = {
    login,
    register
}