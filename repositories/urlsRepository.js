import db from "../config/db.js";

export async function insertNewUrl(userId, url, shortenedUrl){
    return await db.query(`INSERT INTO
        urls("userId", original, shortened)
        VALUES ($1, $2, $3);`,
        [userId, url, shortenedUrl]
    );
}