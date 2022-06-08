import db from "../config/db.js";

export async function insertNewUrl(userId, url, shortenedUrl){
    return await db.query(`INSERT INTO
        urls("userId", original, shortened)
        VALUES ($1, $2, $3);`,
        [userId, url, shortenedUrl]
    );
}

export async function selectUrl(urlId){
    const url = await db.query(`
        SELECT *
        FROM urls
        WHERE id = $1;`,
        [urlId]
    );
    return url.rows[0];
}