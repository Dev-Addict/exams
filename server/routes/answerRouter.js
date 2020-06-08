const express = require('express');

const answerController = require('../controllers/answerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, answerController.getAnswers)
    .post(authController.protect, answerController.checkIsCreated, answerController.createAnswer);

router.route('/:id')
    .get(authController.protect, answerController.getAnswer)
    .patch(authController.protect, answerController.deleteStudentAndExam, answerController.updateAnswer)
    .delete(authController.protect, answerController.deleteAnswer);

module.exports = router;