const express = require('express');
const router  = express.Router();
const Validator = require('../utils/validator/Validator-user');
const controllerPost = require('../controllers/users/controllerPost');
const controllerAuth = require('../controllers/users/controllerAuth');


router.post('/register',
    Validator.isNotUserRole, // Middleware
    Validator.isEmptyName, // Middleware    
    Validator.isEmptyLastname, // Middleware
    Validator.isEmptyEmail, // Middleware    
    Validator.isEmptyPassword, // Middleware
    controllerPost.sendUser // Controller
)

router.post('/login',
    Validator.isEmptyEmail, // Middleware
    Validator.isEmptyPassword, // Middleware
    controllerAuth.loginUser // Controller
)


module.exports = router;