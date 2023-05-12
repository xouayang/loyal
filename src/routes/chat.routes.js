const controller = require('../controllers/chat.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/:id', verifyToken, controller.create);
routes.get('/', verifyToken, controller.findAll);
routes.get('/:id', verifyToken, controller.findOne);


module.exports = routes
