const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exam'
    },
    question: {
        type: String
    },
    questionAsset: {
        type: String
    },
    type: {
        type: String,
        enum: {
            values: ['descriptive', 'test'],
            message: 'Invalid type'
        },
        default: 'test'
    },
    option1: {
        type: String
    },
    option1Asset: {
        type: String
    },
    option2: {
        type: String
    },
    option2Asset: {
        type: String
    },
    option3: {
        type: String
    },
    option3Asset: {
        type: String
    },
    option4: {
        type: String
    },
    option4Asset: {
        type: String
    },
    correctOption: {
        type: String,
        enum: {
            values: ['option1', 'option2', 'option3', 'option4'],
            message: 'Invalid correctOption'
        }
    },
    level: {
        type: Number,
        required: [true, 'A question must have a level']
    },
    used: {
        type: Number,
        default: 0
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;