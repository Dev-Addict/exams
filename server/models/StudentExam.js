const mongoose = require('mongoose');

const studentExamSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Question'
    },
    exam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exam',
        required: true
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

const StudentExam = mongoose.model('StudentExam', studentExamSchema);

module.exports = StudentExam;