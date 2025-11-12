import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as exerciseService from '../../services/exerciseService';
import { UserContext } from "../../contexts/UserContext";
import styles from './ExerciseDetails.module.css'

const ExerciseDetails = (props) => {
    const [exercise, setExercise] = useState(null);
    const {exerciseId } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
    const fetchExercise = async () => {
      const exerciseData = await exerciseService.show(exerciseId);
      setExercise(exerciseData);
    };
    fetchExercise();
  }, [exerciseId]);

    if (!exercise) return <main>Loading...</main>

return (
    <main className={styles.container}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{exercise.name}</h1>
          <h2 className={styles.category}>Category: {exercise.category}</h2>
          <p className={styles.description}>Description: {exercise.description}</p>

          <p className={styles.meta}>
            {`${exercise.author.username} posted on
            ${new Date(exercise.createdAt).toLocaleDateString()}`}
          </p>
          {exercise.author._id === user._id && (
            <div className={styles.actions}>
            <Link to={`/exercises/${exerciseId}/edit`} className={styles.editButton}>Edit</Link>
            <button onClick={() => props.handleDeleteExercise(exerciseId)} className={styles.deleteButton}>Delete</button>
            </div>
          )}
        </header>
      </section>
    </main>
  );
}


export default ExerciseDetails;