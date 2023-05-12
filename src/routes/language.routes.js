const controller = require('../controllers/language.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.get('/', verifyToken, controller.findAll);
routes.get('/:id', verifyToken, controller.findOne);

module.exports = routes
