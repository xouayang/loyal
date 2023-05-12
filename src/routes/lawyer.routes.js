const controller = require('../controllers/lawyer.controller');
const routes = require('express').Router();
const verifyToken = require('../middlewares');

routes.post('/',verifyToken, controller.createLawyer);
routes.get('/',verifyToken, controller.getAll);
routes.get('/:id',verifyToken, controller.singleData);
routes.put('/:id',verifyToken, controller.updateData);
routes.delete('/:id',verifyToken, controller.deleteData);


module.exports = routes
