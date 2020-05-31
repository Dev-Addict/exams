const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    },
    answer: {
        type: String
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;