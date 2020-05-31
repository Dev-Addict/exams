const express = require('express');

const userRouter = require('../routes/userRouter');
const examRouter = require('../routes/examRouter');

const router = express.Router({mergeParams: true});

router.use('/users', userRouter);
router.use('/exams', examRouter);

module.exports = router;