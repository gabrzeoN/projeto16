import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res){
    const { name, email, password } = req.body;
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