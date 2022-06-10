import { selectUser } from "../repositories/usersRepository.js";

export async function validSignUp(req, res, next){
    const { email } = req.body;
    try{
        const user = await selectUser(email);
        if(user) return res.status(409).send("User already exists!");
        next();
    }catch(err){
        return res.sendStatus(500);
    }
}

export async function validSignIn(req, res, next){
    const { email } = req.body;
    try{
        const user = await selectUser(email);
        if(!user)return res.status(401).send("Email and password doesn't match!");
        res.locals.user = user;
        next();
    }catch(err){
        return res.sendStatus(500);
    }
}