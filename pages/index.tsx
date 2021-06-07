import Head from 'next/head';
import { useState } from 'react';
import styles from '@styles/Home.module.scss';
import JokeTodayComponent from '@components/JokeToday';
import DiscoverJoke from '@components/DiscoverJoke';
import JokeList from '@components/JokeList';

const Home = () => {

  return (
    <div className={styles.home_container}>
      <Head>
        <title>Joke List</title>
      </Head>
      <div className={styles.home_content}>
        <JokeTodayComponent/>
        <DiscoverJoke/>
        <JokeList/>
      </div>
    </div>
  );
}

export default Home;
