const all = async (req, res, next) => {
    res.json({msg:"All Posts"});
}
const get = async (req, res, next) => {
    res.json({msg:"Single Post"});
}

const post = async (req, res, next) => {
    res.json({msg:"Create Post"});
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