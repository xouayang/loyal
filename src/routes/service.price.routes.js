const controller = require('../controllers/service.price.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.delete('/:id', verifyToken, controller.delete);
routes.get('/', verifyToken, controller.findAll);

module.exports = routes
