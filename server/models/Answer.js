const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: [true, 'An answer must have an question']
    },
    answer: {
        type: String,
        required: [true, 'An answer must have an answer']
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'An answer must have an student']
    }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;