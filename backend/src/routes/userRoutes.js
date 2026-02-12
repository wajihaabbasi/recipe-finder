const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { registerRules, loginRules } = require('../middleware/validationRules');
router.post('/register', registerRules, userController.registerUser);
router.post('/login', loginRules, userController.loginUser); 

const verifyToken  = require('../middleware/authMiddleware');
router.delete('/profile', verifyToken, userController.deleteUser);

module.exports = router;

