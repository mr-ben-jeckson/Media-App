const all = async(req, res, next) => {
    res.json({msg:"All Users"});
}
const get = async(req, res, next) => {
    res.json({msg:"Single User"});
}
const add = async(req, res, next) => {
    res.json({msg:"User created", result:req.body});
}
const patch = async(req, res, next) => {
    res.json({msg:"Patch User"});
}
const drop = async(req, res, next) => {
    res.json({msg:"Deleted User"});
}
module.exports = {
    all,
    get,
    add,
    patch,
    drop
}