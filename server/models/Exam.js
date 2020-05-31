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
        type: Number
    },
    level2Amount: {
        type: Number
    },
    level3Amount: {
        type: Number
    },
    level4Amount: {
        type: Number
    },
    level5Amount: {
        type: Number
    },
    level6Amount: {
        type: Number
    },
    level7Amount: {
        type: Number
    },
    level8Amount: {
        type: Number
    },
    level9Amount: {
        type: Number
    },
    level10Amount: {
        type: Number
    },
    for: {
        type: [String]
    }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;