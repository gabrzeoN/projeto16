import joi from "joi";


export default function validSchema(req, res, next){
    const user = req.body;

    const {error} = signUpSchema.validate(user, {abortEarly: false});
    if(error){
        return res.status(406).send(error.details.map(detail => detail.message));
    }
    next();
}