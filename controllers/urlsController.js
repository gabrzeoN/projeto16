import { nanoid } from "nanoid";
import { insertNewUrl, selectUrlById, selectUrlByShortUrl, incrementUrlViews, deleteUrl } from "../repositories/urlsRepository.js";

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
        const url = await selectUrlById(urlId);
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

export async function openShortenedUrl(req, res){
    const { shortUrl } = req.params;
    try{
        const url = await selectUrlByShortUrl(shortUrl);
        if(!url) return res.status(404).send("URL not found!");
        incrementUrlViews(shortUrl);
        return res.redirect(200, url);
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}

export async function deleteShortenedUrl(req, res){
    const { urlId } = req.params;
    const { userId } = res.locals.session;
    try{
        const url = await selectUrlById(urlId);
        if(!url) return res.status(404).send("URL not found!");
        const permission = url.userId === userId;
        if(!permission) return res.status(401).send("You are not authorized to delete this URL!");
        await deleteUrl(urlId);        
        return res.status(204).send("URL successfuly deleted!");
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}