const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    // upload com um nome randomico, tornando possível upload a mesma imagem mais de uma vez
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

module.exports.uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
