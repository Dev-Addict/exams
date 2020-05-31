const factory = require('./handlerFactory');
const StudentExam = require('../models/StudentExam');

exports.getStudentExams = factory.getAll(StudentExam);

exports.createStudentExam = factory.createOne(StudentExam);

exports.getStudentExam = factory.getOne(StudentExam);

exports.updateStudentExam = factory.updateOne(StudentExam);

exports.deleteStudentExam = factory.deleteOne(StudentExam);