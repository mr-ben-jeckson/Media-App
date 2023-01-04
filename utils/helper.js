const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fmsg = async (res, msg = "Success", result = []) => {
    res.status(200).json({
        con: true,
        msg,
        result
    })
}

module.exports = {
    encode: password => bycrypt.hashSync(password),
    comparePass: (plain, hash) => bycrypt.compareSync(plain, hash),
    makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3h" }),
    Fmsg
}