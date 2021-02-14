'use strict';

const express = require('express');
const router = express.Router();
const leadboardController = require('../controllers/leadboard.controller');
const validate = require('../middlewares/validateRequest');
const leadboardSchemas = require('../input-models/leadboard.input');
const requireToken = require('../middlewares/requireToken');

router.post('/', requireToken, validate(leadboardSchemas.saveResult), leadboardController.insertUserResult);
router.get('/', requireToken, validate(leadboardSchemas.getLeadboards), leadboardController.getLeadboardsById);

module.exports = router;