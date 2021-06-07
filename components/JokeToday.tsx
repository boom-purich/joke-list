import { useState,useEffect } from 'react';
import styles from '@styles/JokeToday.module.scss';
import CopyComponent from '@components/Copy';
import { Copy } from '@models/joke.model';
import { convertStringToHTML } from '@utils/convert';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

const JokeToday = () => {

    const [copyOptionObj,setCopyOptionObj] = useState<Copy>({class_name:'joke_today_copy_btn',copy_text:''})
    const [loading,setLoading] = useState<boolean>(true);
    const useJokeTodayText = () => {
      const [jokeTodayText,setJokeTodayText] = useState<string>('');
      const getJokeToday = async() => {
        try{
          const { data:{resultData:{joke}} } = await axios.get(`/api/joke_today`);
          setJokeTodayText(prevValue => prevValue = convertStringToHTML(joke));
          setCopyOptionObj({...copyOptionObj,copy_text:convertStringToHTML(joke)});
        }catch(error){
          setJokeTodayText(prevValue => prevValue = '');
          setCopyOptionObj({...copyOptionObj,copy_text:''});
        }
        setLoading(prevValue => prevValue = false);
      }
      useEffect(() => {
        getJokeToday();
      },[])
      
      return { jokeTodayText,setJokeTodayText };
    }

    const { jokeTodayText } = useJokeTodayText(); 


    return (
        <div className={styles.joke_today_container}>
          <div className={styles.joke_today_topic}>Joke for today</div>
          <div className={styles.joke_today_box}>
            <CopyComponent {...copyOptionObj}/>
            {
              loading ? <Skeleton className={styles.joke_today_pulse} animation="pulse"/> : <span className={styles.joke_today_detail}>{convertStringToHTML(jokeTodayText)}</span>
            }
          </div>
        </div>
    );
}

export default JokeToday;
