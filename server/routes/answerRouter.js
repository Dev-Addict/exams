const express = require('express');

const answerController = require('../controllers/answerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, answerController.getAnswers)
    .post(authController.protect, answerController.checkDate, answerController.checkIsCreated, answerController.createAnswer);

router.route('/:id')
    .get(authController.protect, answerController.getAnswer)
    .patch(authController.protect, authController.restrictTo('admin'), answerController.updateAnswer)
    .delete(authController.protect, answerController.deleteAnswer);

module.exports = router;