const factory = require('./handlerFactory');
const Answer = require('../models/Answer');
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
        const answer = Answer.findOne({student, question});
        if (!answer) {
            return next();
        }
        res.status(201).json({
            status: 'success',
            data: {
                doc: answer
            }
        });
    }
);

exports.setStudent = catchRequest(
    (req, res, next) => {
        req.body.student = req.user._id;
        next();
    }
);

exports.deleteStudentAndExam = catchRequest(
    (req, res, next) => {
        req.body.student = undefined;
        req.body.exam = undefined;
        next();
    }
);