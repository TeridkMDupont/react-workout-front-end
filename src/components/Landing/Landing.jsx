import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.container}>
      <div className={styles.imageContainer}>
      <img src="https://i.imgur.com/3rbIMus.png" alt="figure lifting weights" className={styles.heroImage}/>
      </div>
      <section className={styles.textSection}>
      <h1 className={styles.title}>Welcome to Community Gains! An application built to bring people together and improve their lives at the same time!</h1>
      <p className={styles.subtitle}>Sign up or sign in now to partake in the gains!!</p>
      </section>
    </main>
  );
};

export default Landing;
