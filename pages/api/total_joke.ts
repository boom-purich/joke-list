import axios from 'axios';
import { responseMapping } from '@utils/responseMapping';

const totalJokeHandler = async(req,res) => {
    try{
        const url = `http://api.icndb.com/jokes/count`;
        const {data} = await axios.get(url);
        res.status(200).json(responseMapping({total_joke:data?.value}));
    }catch(error){
        res.status(500).json(responseMapping({}));
    }
}

export default totalJokeHandler;