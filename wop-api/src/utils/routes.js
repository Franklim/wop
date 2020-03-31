const express = require('express');
const GroupController = require('../controllers/GroupController')
const constants = require('./Constants')


const routes = express.Router();

routes.post(constants.GROUP_POST, GroupController.create);
routes.put(constants.GROUP_PUT, GroupController.update);
routes.get(constants.GROUP_GET, GroupController.list);
routes.delete(constants.GROUP_DELETE, GroupController.delete);


module.exports = routes;