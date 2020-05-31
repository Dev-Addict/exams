const factory = require('./handlerFactory');
const StudentExam = require('../models/StudentExam');
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
        const studentExam = StudentExam.findOne({student, exam});
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

exports.setStudent = catchRequest(
    (req, res, next) => {
        req.body.student = req.user._id;
    }
);