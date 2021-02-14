const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes'));
router.use('/quiz', require('./quiz.routes'));
router.use('/leadboards', require('./leadboard.routes'));

module.exports = router;