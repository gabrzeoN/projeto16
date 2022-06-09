import db from "../config/db.js";

export async function insertNewUrl(userId, url, shortenedUrl){
    return await db.query(`INSERT INTO
        urls("userId", original, shortened)
        VALUES ($1, $2, $3);`,
        [userId, url, shortenedUrl]
    );
}

export async function selectUrlById(urlId){
    const url = await db.query(`
        SELECT *
        FROM urls
        WHERE id = $1;`,
        [urlId]
    );
    return url.rows[0];
}

export async function selectUrlByShortUrl(shortUrl){
    const url = await db.query(`
        SELECT original
        FROM urls
        WHERE "shortened" = $1;`,
        [shortUrl]
    );
    return url.rows[0]?.original;
}

export async function updateUrlViews(shortUrl){
    await db.query(`
        UPDATE urls 
        SET views = views + 1
        WHERE shortened = $1;`,
        [shortUrl]
    );
    return;
}