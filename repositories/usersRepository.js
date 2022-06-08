import db from "../config/db.js";

export async function insertNewUser(name, email, encryptedPassword){
    return await db.query(`INSERT INTO
        users(name, email, password)
        VALUES ($1, $2, $3);`,
        [name, email, encryptedPassword]
    );
}

export async function selectUser(email){
    const user = await db.query(`
        SELECT *
        FROM users
        WHERE email = $1;`,
        [email]
    );
    return user.rows[0];
}