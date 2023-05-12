const controller = require('../controllers/checkAdim');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.create);
routes.put('/update/:id', verifyToken, controller.updateStatus);
routes.get('/get-all', verifyToken, controller.getAll);
routes.get('/check-permission', verifyToken,controller.checkUsers);

module.exports = routes
