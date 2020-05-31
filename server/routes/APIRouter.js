const express = require('express');

const userRouter = require('../routes/userRouter');
const examRouter = require('../routes/examRouter');
const questionRouter = require('../routes/questionRouter');
const answerRouter = require('../routes/answerRouter');

const router = express.Router({mergeParams: true});

router.use('/users', userRouter);
router.use('/exams', examRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);

module.exports = router;