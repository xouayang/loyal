const controller = require('../controllers/translate.document.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.get('/', verifyToken, controller.findAll);
routes.get('/id/:id', verifyToken, controller.findOne);
routes.get('/status', verifyToken, controller.findAllByStatus);
routes.get('/status-proceeding', verifyToken, controller.findAllProceeding);
routes.get('/status-proceed', verifyToken, controller.findAllProceed);

module.exports = routes


