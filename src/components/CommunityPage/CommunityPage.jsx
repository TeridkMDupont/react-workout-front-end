import { Link } from 'react-router';
import styles from './CommunityPage.module.css'

const CommunityPage = (props) => {
    return (
        <main className={styles.container}>
            <h2 className={styles.intro}>Workouts created by each member show up here for you to explore!</h2>
            
          <section className={styles.workoutsGrid}>
            {props.workouts.map((workout) => (
                <Link key={workout._id} to={`/workouts/${workout._id}`}>
                    <article className={styles.workoutCard}>
                        <header className={styles.header}>
                            <h2>{workout.name}</h2> 
                            <h3>Intensity Level:  {workout.rating}</h3>
                        </header>
                        <p className={styles.author}>
                            {`${workout.author.username} posted on
                            ${new Date(workout.createdAt).toLocaleDateString()}`}
                        </p>
                    </article>
                </Link>
            ))}
         </section>
        </main>
    )
}

export default CommunityPage;