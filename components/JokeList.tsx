import { useSelector} from 'react-redux';
import styles from '@styles/JokeList.module.scss';
import { RootState } from '@redux/store';
import CopyComponent from '@components/Copy';
import { convertStringToHTML } from '@utils/convert';
import Skeleton from '@material-ui/lab/Skeleton';

const JokeList = () => {

    const { jokes,loadingJoke } = useSelector((state: RootState) => state);

    return (
        <>
        <div className={styles.joke_list_container}>
            <div className={styles.result_joke_container}>
                <span className={styles.topic}>Result of joke</span>
                <span className={styles.amount_container}>
                    <span className={styles.amount_word}>{jokes.length}</span>
                    <span className={styles.joke_word}>{jokes.length > 1 ? 'jokes' : 'joke'}</span>
                </span>
            </div>
            <div className={styles.joke_list_content}>
                {
                    loadingJoke ? <Skeleton className={styles.loading_joke_skeleton} animation="pulse"/> :
                    (jokes && jokes.length === 0 ? (
                        <div className={styles.cannot_find_out_word}>
                            <div className={styles.cannot_find_word}>We cannot find your joke.</div>
                            <div className={styles.find_out_word}>Let's find out</div>
                        </div>
                    ) : (
                        <div className={styles.joke_card_group_container}>
                            {jokes.map((list, index) => (
                                <div className={styles.joke_card_container} key={`joke_card_${index}`}>
                                    <CopyComponent key={`joke_card_copy_${index}_btn`} {...{class_name:'card_copy_btn',copy_text:list?.joke}}/>
                                    <div className={styles.joke_description}>{convertStringToHTML(list?.joke)}</div>
                                    {
                                        list?.categories && list?.categories.map((categoryList, index) => (
                                            <div className={styles.category_card_group} key={`category_card_${index}`}>
                                                <span className={styles.category_card}>{categoryList}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
        
        </>
    );
}

export default JokeList;
