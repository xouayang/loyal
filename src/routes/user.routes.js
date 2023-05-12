const routes = require('express').Router();
const controller = require('../controllers/user.controllers');
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.post('/login', controller.login);
routes.put('/:id', verifyToken, controller.update);
routes.get('/', verifyToken, controller.findAll);
routes.get('/:id', verifyToken, controller.findOne);

module.exports = routes
