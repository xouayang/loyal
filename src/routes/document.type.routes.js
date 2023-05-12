const controller = require('../controllers/document.type.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/:id', verifyToken, controller.updateData);
routes.get('/', verifyToken, controller.getAll);
routes.get('/:id', verifyToken, controller.singleData);
routes.delete('/:id', verifyToken, controller.deleteData);

module.exports = routes
