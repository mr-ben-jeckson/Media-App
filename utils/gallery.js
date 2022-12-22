const saveFile = (req, res, next) => {
    let file = req.files.file;
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${filename}`);
    req.imageName = filename;
    next();
};

module.exports = {
    saveFile
};