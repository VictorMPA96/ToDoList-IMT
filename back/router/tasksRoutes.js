const express = require('express');
const router  = express.Router();
const Validator = require('../utils/validator/Validator');
const Validator_Auth = require('../utils/validator/Validator-auth');
const controllerPost = require('../controllers/todos/controllerPost');
const controllerGet = require('../controllers/todos/controllerGet');
const controllerPut = require('../controllers/todos/controllerPut');
const controllerDelete = require('../controllers/todos/controllerDelete');

router.get('/',
  //Validator_Auth.isNotAuthenticated, // Middleware
  controllerGet.getToDos // Controller
)

router.post('/',
  //Validator_Auth.isNotAuthenticated, // Middleware
  Validator.isEmptyName, // Middleware
  Validator.nameIsRepeated, // Middleware
  controllerPost.sendToDo // Controller
)

router.get('/:id',
  //Validator_Auth.isNotAuthenticated, // Middleware
  Validator.idNotFound, // Middleware
  controllerGet.getToDo // Controller
)

router.put('/:id',
  //Validator_Auth.isNotAuthenticated, // Middleware
  Validator.idNotFound, // Middleware
  Validator.isEmptyName, // Middleware 
  Validator.nameIsRepeated, // Middleware 
  Validator.statusNotCompatible, // Middleware
  Validator.priorityNotCompatible, // Middleware
  controllerPut.updateToDo // Controller
)

router.delete('/:id',
  //Validator_Auth.isNotAuthenticated, // Middleware
  Validator.idNotFound, // Middleware
  controllerDelete.deleteToDo // Controller
)

router.delete('/',
  //Validator_Auth.isNotAuthenticated, // Middleware
  controllerDelete.deleteAllToDos // Controller
)

module.exports = router;

