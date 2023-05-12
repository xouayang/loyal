const controller = require('../controllers/consult.lawyer.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.get('/', verifyToken, controller.findAll);
routes.get('/id/:id', verifyToken, controller.findOne);
routes.get('/members', verifyToken, controller.findAllByMember);
routes.get('/status', verifyToken, controller.findAllByStatus);
routes.get('/status-web', verifyToken, controller.findAllByStatusWeb);

module.exports = routes
