//Cusom Api Error so we can control the message and error status.
class CustomAPIError extends Error{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = CustomAPIError;