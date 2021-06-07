import axios from 'axios';
import { responseMapping } from '@utils/responseMapping';

const categoriesHandler = async(req,res) => {
    try{
        const url = `http://api.icndb.com/categories`;
        const {data} = await axios.get(url);
        res.status(200).json(responseMapping(data?.value));
    }catch(error){
        res.status(500).json(responseMapping({}));
    }
}

export default categoriesHandler;