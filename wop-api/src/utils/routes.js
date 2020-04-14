const express = require('express');
const constants = require('./Constants')

const GroupController = require('../controllers/GroupController')
const PersonController = require('../controllers/PersonController')
const UserController = require('../controllers/UserController')
const AuthenthicationController = require('../controllers/AuthenthicationController')

const routes = express.Router();

routes.post(constants.GROUP_POST, GroupController.create);
routes.put(constants.GROUP_PUT, GroupController.update);
routes.get(constants.GROUP_GET, GroupController.paginatedList);
routes.delete(constants.GROUP_DELETE, GroupController.delete);

routes.post(constants.PERSON_POST, PersonController.create);
routes.put(constants.PERSON_PUT, PersonController.update);
routes.get(constants.PERSON_GET, PersonController.paginatedList);
routes.delete(constants.PERSON_DELETE, PersonController.delete);

routes.post(constants.USER_POST, UserController.create);
routes.put(constants.USER_PUT, UserController.update);
routes.get(constants.USER_GET, UserController.paginatedList);
routes.delete(constants.USER_DELETE, UserController.delete);

routes.post(constants.AUTH_POST, AuthenthicationController.auth);

module.exports = routes;