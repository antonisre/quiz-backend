const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes'));
router.use('/quiz', require('./quiz.routes'));

module.exports = router;