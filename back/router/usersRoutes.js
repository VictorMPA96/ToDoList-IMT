const express = require('express');
const router  = express.Router();
const Validator = require('../utils/validator/Validator-user');
const Validator_Auth = require('../utils/validator/Validator-auth');
const controllerPost = require('../controllers/users/controllerPost');
const controllerGet = require('../controllers/users/controllerGet');
const controllerPut = require('../controllers/users/controllerPut');
const controllerDelete = require('../controllers/users/controllerDelete');


router.get('/', 
    Validator_Auth.isNotAuthenticated, // Middleware
    Validator.isNotAdminRole, // Middleware
    controllerGet.getUsers // Controller
)

router.post('/',
    Validator_Auth.isNotAuthenticated, // Middleware
    Validator.isNotAdminRole, // Middleware
    Validator.isEmptyName, // Middleware    
    Validator.isEmptyLastname, // Middleware   
    Validator.isEmptyEmail, // Middleware    
    Validator.isEmptyPassword, // Middleware
    controllerPost.sendUser// Controller
)

router.get('/:id',
    Validator_Auth.isNotAuthenticated, // Middleware
    Validator.isNotAdminRole, // Middleware
    controllerGet.getUser // Controller
)

router.put('/:id',
    Validator_Auth.isNotAuthenticated, // Middleware
    controllerPut.updateUser // Controller
)

router.delete('/:id',
    Validator_Auth.isNotAuthenticated, // Middleware
    Validator.isNotAdminRole, // Middleware
    controllerDelete.deleteUser // Controller
)

router.delete('/', 
    Validator_Auth.isNotAuthenticated, // Middleware
    Validator.isNotAdminRole, // Middleware
    controllerDelete.deleteAllUsers // Controller
)



module.exports = router;
