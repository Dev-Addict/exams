const factory = require('./handlerFactory');
const Answer = require('../models/Answer');
const StudentExam = require('../models/StudentExam');
const catchRequest = require('../utils/catchRequest');

exports.getAnswers = factory.getAll(Answer);

exports.createAnswer = factory.createOne(Answer);

exports.getAnswer = factory.getOne(Answer);

exports.updateAnswer = factory.updateOne(Answer);

exports.deleteAnswer = factory.deleteOne(Answer);

exports.checkIsCreated = catchRequest(
    async (req, res, next) => {
        const student = req.user._id;
        const question = req.body.question;
        const answer = await Answer.findOne({student, question});
        if (!answer) {
            return next();
        }
        req.params.id = answer._id;
        factory.updateOne(Answer)(req, res, next);
    }
);

exports.deleteStudentAndExam = catchRequest(
    (req, res, next) => {
        req.body.student = undefined;
        req.body.question = undefined;
        next();
    }
);

exports.checkDate = catchRequest(
    async (req, res, next) => {
        const studentExam = StudentExam.findOne({student: req.body.student, questions: req.body.question});
        if (studentExam.startDate.getTime() < Date.now() < studentExam.endDate.getTime())
            return next();
        throw new AppError('Too late or too soon to make this request.');
    }
);