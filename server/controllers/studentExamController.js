const factory = require('./handlerFactory');
const StudentExam = require('../models/StudentExam');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const catchRequest = require('../utils/catchRequest');
const AppError = require('../utils/AppError');

exports.getStudentExams = factory.getAll(StudentExam);

exports.createStudentExam = factory.createOne(StudentExam);

exports.getStudentExam = factory.getOne(StudentExam);

exports.updateStudentExam = factory.updateOne(StudentExam);

exports.deleteStudentExam = factory.deleteOne(StudentExam);

exports.checkIsCreated = catchRequest(
    async (req, res, next) => {
        const student = req.user._id;
        const exam = req.body.exam;
        const studentExam = await StudentExam.findOne({student, exam});
        if (!studentExam) {
            return next();
        }
        res.status(201).json({
            status: 'success',
            data: {
                doc: studentExam
            }
        });
    }
);

exports.setQuestions = catchRequest(
    async (req, res, next) => {
        req.body.questions = [];
        const exam = await Exam.findById(req.body.exam);
        const questions = await Question.find({exam: exam._id});
        for (let i = 1; i <= 10; i++) {
            if (exam[`level${i}Amount`] === 0)
                continue;
            const levelQuestions = questions.filter(({level}) => level === i);
            levelQuestions.sort((a, b) => a.used > b.used ? 1 : -1);
            levelQuestions.splice(0, exam[`level${i}Amount`]).forEach(question => {
                question.used += 1;
                question.save();
            });
            req.body.questions = [...req.body.questions, ...levelQuestions.splice(0, exam[`level${i}Amount`])];
        }
        next();
    }
);

exports.setDates = catchRequest(
    async (req, res, next) => {
        req.body.startDate = new Date();
        const exam = await Exam.findById(req.body.exam);
        req.body.endDate = new Date(Math.min(Date.now() + exam.time * 60000, exam.endAt.getTime()));
        next();
    }
);

exports.checkDate = catchRequest(
    async (req, res, next) => {
        const exam = await Exam.findById(req.body.exam);
        if (exam.startAt.getTime() < Date.now() < exam.endAt.getTime()) {
            return next();
        }
        throw new AppError('Too late or too soon to make this request.');
    }
);