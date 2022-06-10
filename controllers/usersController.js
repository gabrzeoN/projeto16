import { selectUrlByUserId, countAllViews } from "../repositories/urlsRepository.js";
import { selectUserById } from "../repositories/usersRepository.js";

export async function getUser(req, res){
    const { userId } = req.params;
    if(!userId) return res.status(404).send("User not found!");
    try{
        const user = await selectUserById(userId);
        if(!user) return res.status(404).send("User not found!");
        const userUrls = await selectUrlByUserId(userId);
        if(!userUrls.length) return res.status(200).send({...user, visitCount: 0, shortenedUrls: userUrls});
        const visitCount = await countAllViews(userId);
        return res.status(200).send({...user, visitCount, shortenedUrls: userUrls});
    }catch(err){
        console.log(err); // TODO: erase me
        return res.sendStatus(500);
    }
}