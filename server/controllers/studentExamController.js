const factory = require('./handlerFactory');
const StudentExam = require('../models/StudentExam');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const catchRequest = require('../utils/catchRequest');

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
            if (i === 0)
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