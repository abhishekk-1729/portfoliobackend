const validate = (schema) => async(req,res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(err);
        // err is an array of objects that's why .message is there
        const status = 400;
        const message = "Invalid details";
        const extraDetails = err.errors[0].message;
        const error = {status,message,extraDetails};
        next(error);
    }
}

module.exports = validate;