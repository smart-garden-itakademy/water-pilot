

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.cause= message;
        this.statusCode = statusCode;
    }
}

module.exports = {CustomError};