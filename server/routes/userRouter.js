const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/auth/checktoken').post(authController.protect, authController.isSignedIn);
router.route('/auth/singout').post(authController.signOut);
router.route('/auth/signin').post(authController.signIn);

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser);

router.route('/:id')
    .get(authController.protect, authController.restrictTo('selfUser', 'admin'), userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;