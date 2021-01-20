'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validateRequest');
const userSchemas = require('../input-models/user.input');

router.post('/signup', validate(userSchemas.signupParams), userController.signup);
router.post('/signin', validate(userSchemas.signinParams), userController.signin);

module.exports = router;