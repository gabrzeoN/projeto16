import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import db from "../config/db.js";
import { insertNewUser } from "../repositories/usersRepository.js";

export async function signUp(req, res){
    const { name, email, password } = req.body;
    try{
        const encryptedPassword = await bcrypt.hash(password, 10);
        await insertNewUser(name, email, encryptedPassword);
        return res.sendStatus(201);
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}

export async function signIn(req, res){
    const { email, password } = req.body;
    console.log(req.body) // TODO: erase me
    try{
        const encryptedPassword = await bcrypt.hash(password, 10);
        await db.query(`INSERT INTO
            users(name, email, password)
            VALUES ($1, $2, $3);`,
            [name, email, encryptedPassword]
        );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}

// middware
// controller
// service
// repository