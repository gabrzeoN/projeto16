import db from "../config/db.js";

export async function validSignUp(req, res, next){
    const { email } = req.body;
    try{
        const user = await db.query(`
            SELECT *
            FROM users
            WHERE email = $1;`,
            [email]
        );
        console.log(user.rows)
        if(user.rows[0]){
            return res.status(409).send("User already exists!");
        }
        next();
    }catch(err){
        console.log(err) // TODO : erase me
        res.sendStatus(500);
    }
}