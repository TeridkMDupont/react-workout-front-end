import { Link } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './Dashboard.module.css';


const Dashboard = (props) => {
  const { user } = useContext(UserContext);

    const userWorkouts = props.workouts.filter(
    (workout) => workout.author._id === user._id
  );

  return (
    <main className={styles.container}>
      <h2 className={styles.intro}>
        Welcome to your Dashboard! All the workouts you create will appear here.
      </h2>

      {userWorkouts.length > 0 ? (
        <section className={styles.workoutGrid}>
          {userWorkouts.map((workout) => (
            <Link
              key={workout._id}
              to={`/workouts/${workout._id}`}
              className={styles.workoutLink}
            >
              <article className={styles.workoutCard}>
                <header className={styles.header}>
                  <h2>{workout.name}</h2>
                  <h3>Intensity Level: {workout.rating}</h3>
                </header>
                <p className={styles.meta}>
                  {`${workout.author.username} posted on ${new Date(
                    workout.createdAt
                  ).toLocaleDateString()}`}
                </p>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p className={styles.noWorkouts}>No Workouts to display!</p>
      )}
    </main>
  );
}

export default Dashboard;
