const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//A user with a username, email, and password. email regex taken from Stackoverflow
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

//Encrypts the password before saving so that the password is not saved directly in the database as a string.
UserSchema.pre('save', async function(next)
{
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//A method to create a JWT for a user upon login or registration.
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

//Compare the password to the existing user's password for login, using bcrypt
UserSchema.methods.ComparePassword = async function(password)
{
    const match = await bcrypt.compare(password, this.password);
    return match;
}

module.exports = mongoose.model('User', UserSchema);