const controller = require('../controllers/translate.price.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.delete('/:id', verifyToken, controller.delete);
routes.get('/', verifyToken, controller.findAll);
routes.get('/by-id/:id', verifyToken, controller.findOne);
routes.get('/price', verifyToken, controller.getPrice);

module.exports = routes
