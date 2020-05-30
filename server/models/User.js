const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User Must Have a name'],
        validate: {
            validator: value => /^[a-zA-Z ]+$/.test(value),
            message: ({value}) => `${value} is not a valid name`
        }
    },
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        validate: {
            validator: value => /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value),
            message: ({value}) => `${value} is not a valid username`
        }
    },
    rote: {
        type: String,
        enum: {
            values: ['admin', 'student'],
            message: 'Invalid User'
        },
        default: 'student'
    },
    password: {
        type: String,
        required: [true, 'A User Must Have A password'],
        minLength: 8,
        maxLength: 100,
        select: false
    }
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;