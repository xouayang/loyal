const controller = require('../controllers/company.info.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares'); const multer = require("multer");


//upload document images
let logoName;
let fileName;

// let fileNameInArray = []

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/logos");
    },
    filename: function (req, file, cb) {
        logoName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
        // fileNameInArray.push(fileName.replaceAll(' ', ''))
        cb(null, logoName.replaceAll(' ', ''));
    },
});

// var storagePolicy = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/logos");
//     },
//     filename: function (req, file, cb) {
//         fileName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
//         // fileNameInArray.push(fileName.replaceAll(' ', ''))
//         cb(null, fileName.replaceAll(' ', ''));
//     },
// });

var upload = multer({ storage: storage });
// var uploadPolicy = multer({ storage: storagePolicy });

routes.post('/', verifyToken, upload.fields([
    { name: "file", maxCount: 1 },
    { name: "policy", maxCount: 1 },
]), controller.create);
routes.put('/info/:id', verifyToken, controller.update);
routes.put('/logo/:id', verifyToken, upload.single('file'), controller.updateLogo);
routes.put('/policy/:id', verifyToken, upload.single('policy'), controller.updatePolicy);
routes.delete('/:id', verifyToken, controller.delete);
routes.get('/', verifyToken, controller.findAll);

module.exports = routes
