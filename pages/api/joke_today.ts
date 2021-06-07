import axios from 'axios';
import { responseMapping } from '@utils/responseMapping';

const jokeTodayHandler = async(req,res) => {
    try{
        const url = `http://api.icndb.com/jokes/random?escape=javascript`;
        const {data} = await axios.get(url);
        res.status(200).json(responseMapping(data?.value));
    }catch(error){
        res.status(500).json(responseMapping({}));
    }
}

export default jokeTodayHandler;