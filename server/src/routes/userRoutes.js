const express = require('express');
const router = express.Router();
const { getUserTheme } = require('../controllers/userController');
const { changeEmail } = require('../controllers/userController');


router.get('/user/theme', getUserTheme);
router.patch('/change-email', changeEmail);

module.exports = router;