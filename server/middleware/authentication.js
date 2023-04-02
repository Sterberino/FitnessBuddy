const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/CustomApiError.js');
const {StatusCodes} = require('http-status-codes')

//Middleware for validating authentication when retrieving data.
const Authenticate = async (req, res, next)=> {
    //The request header should have an authorization field equal to 'Bearer [Json Token]'
    const authHeader = req.headers.authorization;

    //If we don't see the header field or the field does not start with Bearer, we know there isn't a valid Token
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new CustomAPIError('Invalid Authentication.', StatusCodes.UNAUTHORIZED)
    }

    //Get the json web token (The portion of the authorization header field after 'Bearer ')
    const token = authHeader.split(' ')[1];

    //Try to verify it and then call next. Throw an error if the authorization validation fails
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = {
            userId: payload.userId,
            name: payload.userName
        };
        next();
    }
    catch(err)
    {
        throw new CustomAPIError('Invalid Authentication.', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = Authenticate;