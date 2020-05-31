const express = require('express');

const studentExamController = require('../controllers/studentExamController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, studentExamController.getStudentExams)
    .post(authController.protect, studentExamController.checkIsCreated, studentExamController.setStudent, studentExamController.setQuestions, studentExamController.createStudentExam);

router.route('/:id')
    .get(authController.protect, studentExamController.getStudentExam)
    .patch(authController.protect, authController.restrictTo('admin'), studentExamController.updateStudentExam)
    .delete(authController.protect, authController.restrictTo('admin'), studentExamController.deleteStudentExam);

module.exports = router;