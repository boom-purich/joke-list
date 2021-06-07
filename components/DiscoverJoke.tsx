import styles from '@styles/DiscoverJoke.module.scss';
import SearchBoxComponent from '@components/SearchBox';

const DiscoverJoke = () => {
    return (
        <div className={styles.discover_joke_container}>
            <div className={styles.discover_joke_content}>
                <div className={styles.discover_joke_topic}>Find your jokes</div>
                <SearchBoxComponent/>
            </div>
        </div>
    );
}

export default DiscoverJoke;
