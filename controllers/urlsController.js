import { nanoid } from "nanoid";
import { insertNewUrl } from "../repositories/urlsRepository.js";

export async function createShortenedUrl(req, res){
    const { url } = req.body;
    const { userId } = res.locals.session;
    try{
        const shortenedUrl = nanoid(10);
        await insertNewUrl(userId, url, shortenedUrl);
        return res.status(201).send({shortUrl: shortenedUrl});
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}