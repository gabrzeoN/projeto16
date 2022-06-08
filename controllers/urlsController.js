import { nanoid } from "nanoid";
import { insertNewUrl, selectUrl } from "../repositories/urlsRepository.js";

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

export async function getShortenedUrl(req, res){
    const { urlId } = req.params;
    try{
        const url = await selectUrl(urlId);
        if(!url) return res.status(404).send("URL not found!");
        const newUrlObject = {
            id: url.id,
            shortUrl: url.shortened,
            url: url.original
        }        
        return res.status(200).send(newUrlObject);
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}