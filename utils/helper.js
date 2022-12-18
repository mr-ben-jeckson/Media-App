const Fmsg = async (res, msg="Success", result=[]) => {
    res.status(200).json({
        con: true,
        msg,
        result
    })
}

module.exports = {
    Fmsg
}