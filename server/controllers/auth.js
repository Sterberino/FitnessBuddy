const User = require('../models/User.js')
const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('../errors/CustomApiError.js')

//Create a user and issue a JWT token
const Register = async(req, res) => {
    const user = await User.create({...req.body});
    const token = user.CreateJWT();

    res.status(StatusCodes.CREATED).json({user: {userName: user.userName}, token})
}


//Check for email and password in request body, then find the user. 
//If the user exists, check that the password is correct
const Login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
    {
        throw new CustomAPIError('Please provide and email and a password', StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({email})

    if(!user)
    {
        throw new CustomAPIError(`No user found with email ${email}`, StatusCodes.NOT_FOUND);
    }

    const correctPassword = await user.ComparePassword(password);
    if(!correctPassword)
    {
        throw new CustomAPIError('Incorrect Email or Password', StatusCodes.UNAUTHORIZED)
    }

    const token = user.CreateJWT();
    res.status(StatusCodes.OK).json({user: {userName: user.userName}, token});
}

const verifyAuthentication = async (req, res) => {
    if(!req.user.userId || !req.user.name)
    {
        return res.status(StatusCodes.NOT_FOUND).send('No user found with the provided token.')
    }
     res.status(StatusCodes.OK).json({userId: req.user.userId, userName: req.user.name})
}

module.exports = {
    Register,
    Login,
    verifyAuthentication
}