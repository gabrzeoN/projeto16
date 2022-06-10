import { selectRanking } from "../repositories/usersRepository.js";

export async function getRanking(req, res){
    try{
        const ranking = await selectRanking();
        return res.status(200).send(ranking);
    }catch(err){
        return res.sendStatus(500);
    }
}