const express = require('express');

const questionController = require('../controllers/questionController');
const authController = require('../controllers/authController');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router.route('/')
    .get(authController.protect, questionController.getQuestions)
    .post(authController.protect, authController.restrictTo('admin'), uploadImage.fields([
        {
            name: 'questionAsset',
            maxCount: 1
        },
        {
            name: 'option1Asset',
            maxCount: 1
        },
        {
            name: 'option2Asset',
            maxCount: 1
        },
        {
            name: 'option3Asset',
            maxCount: 1
        },
        {
            name: 'option4Asset',
            maxCount: 1
        }
    ]), questionController.saveAssets, questionController.createQuestion);

router.route('/:id')
    .get(authController.protect, questionController.getQuestion)
    .patch(authController.protect, authController.restrictTo('admin'), uploadImage.fields([
        {
            name: 'questionAsset',
            maxCount: 1
        },
        {
            name: 'option1Asset',
            maxCount: 1
        },
        {
            name: 'option2Asset',
            maxCount: 1
        },
        {
            name: 'option3Asset',
            maxCount: 1
        },
        {
            name: 'option4Asset',
            maxCount: 1
        }
    ]), questionController.saveAssets, questionController.updateQuestion)
    .delete(authController.protect, authController.restrictTo('admin'), questionController.deleteQuestion);

module.exports = router;