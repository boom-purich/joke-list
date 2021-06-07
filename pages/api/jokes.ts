import axios from 'axios';
import { responseMapping } from '@utils/responseMapping';

const jokesHandler = async(req,res) => {

    try{
        let cloneFilter:any = {};
        cloneFilter = req.query;
        let filterUrl = "";
        Object.keys(cloneFilter).map(key => {
            if(key === 'firstName' || key === 'lastName') {
                filterUrl += !filterUrl ? `?${key}=${cloneFilter[key]}` : `&${key}=${cloneFilter[key]}`; 
            }

            if(key === 'category') {
                filterUrl += !filterUrl ? `?limitTo=[${cloneFilter[key].replace(/[\[\]']+/g,'')}]` : `&limitTo=[${cloneFilter[key].replace(/[\[\]']+/g,'')}]`;
            }
        })
        const url = `http://api.icndb.com/jokes/random/${cloneFilter?.limit ? cloneFilter.limit : 20}${filterUrl}&escape=html`;
        const {data} = await axios.get(url);
        res.status(200).json(responseMapping(data?.value));
    }catch(error){
        res.status(404).json(responseMapping([]));
    }
    
}

export default jokesHandler;