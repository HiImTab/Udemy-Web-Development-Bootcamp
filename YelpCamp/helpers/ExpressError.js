class ExpressError extends Error{
    constructor(message, statusCode){
        //calls Error constructor
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;