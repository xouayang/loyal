const controller = require('../controllers/lawyer.user.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/', verifyToken, controller.createLawyerUser);
routes.get('/', verifyToken, controller.getAll);
routes.get('/:id', verifyToken, controller.getById);

module.exports = routes
