

class PwdConditionError extends Error {
    constructor(message) {
        super();
        this.name = "PwdConditionError";
        this.message = message;
        this.statusCode = 500
    }
}

module.exports = PwdConditionError;