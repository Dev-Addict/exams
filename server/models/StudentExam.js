const mongoose = require('mongoose');

const studentExamSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Question'
    },
    exam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exam'
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const StudentExam = mongoose.model('StudentExam', studentExamSchema);

module.exports = StudentExam;