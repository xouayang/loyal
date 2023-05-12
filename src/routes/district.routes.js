const controller = require('../controllers/district.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.update);
routes.get('/', verifyToken, controller.findAll);
routes.get('/:id', verifyToken, controller.findOne);
routes.get('/provinces/:id', verifyToken, controller.findByProvince);

module.exports = routes
