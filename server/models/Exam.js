const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An Exam Must have a name.']
    },
    description: {
        type: String
    },
    level1Amount: {
        type: Number,
        default: 0
    },
    level2Amount: {
        type: Number,
        default: 0
    },
    level3Amount: {
        type: Number,
        default: 0
    },
    level4Amount: {
        type: Number,
        default: 0
    },
    level5Amount: {
        type: Number,
        default: 0
    },
    level6Amount: {
        type: Number,
        default: 0
    },
    level7Amount: {
        type: Number,
        default: 0
    },
    level8Amount: {
        type: Number,
        default: 0
    },
    level9Amount: {
        type: Number,
        default: 0
    },
    level10Amount: {
        type: Number,
        default: 0
    },
    for: {
        type: String
    },
    startAt: {
        type: Date,
        required: [true, 'An exam must have an startAt']
    },
    endAt: {
        type: Date,
        required: [true, 'An exam must have an endAt']
    },
    time: {
        type: Number,
        required: [true, 'An exam must have an time']
    }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;