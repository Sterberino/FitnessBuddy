const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide a username.'],
        minLength: 8,
        maxLength: 30,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        minLength: 3,
        maxLength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minLength: 6
    }
})

UserSchema.pre('save', async function(next)
{
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.CreateJWT = function()
{
    return jwt.sign(
        {
            userId: this._id,
            name: this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    );
}

UserSchema.methods.ComparePassword = async function(password)
{
    const match = await bcrypt.compare(password, this.password);
    return match;
}

module.exports = mongoose.model('User', UserSchema);