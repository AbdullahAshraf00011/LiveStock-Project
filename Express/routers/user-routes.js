const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller')
const auth_middleware = require('../middlewares/auth_middleware')

router.post('/',userController.registerUser)
router.post('/login', userController.authUser);
router.get('/profile',auth_middleware.protect, userController.getUserProfile)
router.get('/token',auth_middleware.protect, userController.refreshToken)

module.exports = router;
