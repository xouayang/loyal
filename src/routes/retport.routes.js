const controller = require('../controllers/reports/reportAll');
const routes = require('express').Router();
const verifyToken = require('../middlewares');
routes.get('/report-carry-out',verifyToken,controller.findAll);
routes.get('/report-translate',verifyToken,controller.findTranslateAll);
routes.get('/report-consult-lawyers',verifyToken,controller.findConsult_lawyers);
module.exports = routes
