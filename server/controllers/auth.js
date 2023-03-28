const User = require('../models/User.js')
const {StatusCodes} = require('http-status-codes')

const Register = async(req, res) => {
    const user = await User.create({...req.body});
    const token = user.CreateJWT();

    res.status(StatusCodes.CREATED).json({user: {userName: user.userName}, token})
}

const Login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
    {
        throw new Error();
    }

    const user = await User.findOne({email})

    if(!user)
    {
        throw new Error();
    }

    const correctPassword = await user.ComparePassword(password);
    if(!correctPassword)
    {
        throw new Error();
    }

    const token = user.CreateJWT();
    res.status(StatusCodes.OK).json({user: {userName: user.userName}, token});
}

module.exports = {
    Register,
    Login
}