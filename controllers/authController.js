import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import { insertNewUser } from "../repositories/usersRepository.js";
import { insertNewSession } from "../repositories/sessionsRepository.js";

export async function signUp(req, res){
    const { name, email, password } = req.body;
    try{
        const encryptedPassword = await bcrypt.hash(password, 10);
        await insertNewUser(name, email, encryptedPassword);
        return res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }
}

export async function signIn(req, res){
    const { password } = req.body;
    const { user } = res.locals;
    try{
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword) return res.status(401).send("Email and password doesn't match!");
        const token = uuid();
        await insertNewSession(user.id, token);
        return res.status(200).send(token);
    }catch(err){
        return res.sendStatus(500);
    }
}