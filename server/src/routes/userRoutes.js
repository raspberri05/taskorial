const express = require('express');
const router = express.Router();
const { getUserTheme } = require('../controllers/userController');

router.get('/user/theme', getUserTheme);

module.exports = router;