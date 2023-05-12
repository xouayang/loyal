const controller = require('../controllers/chat.image.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);

module.exports = routes
