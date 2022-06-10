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

export async function selectUrlByUserId(userId){
    const urls = await db.query(`
        SELECT id, shortened AS "shortUrl", original AS url, views AS "visitCount"
        FROM urls
        WHERE "userId" = $1;`,
        [userId]
    );
    return urls.rows;
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

export async function incrementUrlViews(shortUrl){
    await db.query(`
        UPDATE urls 
        SET views = views + 1
        WHERE shortened = $1;`,
        [shortUrl]
    );
    return;
}

export async function countAllViews(userId){
    const allViews = await db.query(`
        SELECT SUM(views)
        FROM urls
        WHERE "userId" = $1;`,
        [userId]
    );
    return allViews.rows[0]?.sum;
}

export async function deleteUrl(urlId){
    const url = await db.query(`
        DELETE FROM urls
        WHERE id = $1;`,
        [urlId]
    );
    return url;
}