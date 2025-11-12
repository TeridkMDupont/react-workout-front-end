import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import CommentForm from "../CommentForm/CommentForm";

import * as workoutService from '../../services/workoutService';
import styles from './WorkoutDetails.module.css'

const WorkoutDetails = (props) => {
    const [workout, setWorkout] = useState(null);
    const { workoutId } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchWorkout = async () => {
            const workoutData = await workoutService.show(workoutId)
            setWorkout(workoutData)
        }
        fetchWorkout();
    }, [workoutId])

    const handleAddComment = async (commentFormData) => {
      const newComment = await workoutService.createComment(workoutId, commentFormData);
      setWorkout({...workout, comments: [...workout.comments, newComment] });
    }
    

    if (!workout) return <main>Loading...</main>

    return (
    <main className={styles.container}>
      <section className={styles.workoutInfo}>
        <header className={styles.header}>
          <h1>{workout.name}</h1>
          <h2>Intensity Level: {workout.rating}</h2>
        </header>
        <div className={styles.exercises}>
          {workout.exercises.map((exercise) => (
            <article key={exercise._id} className={styles.exerciseCard}>
                <p>Exercise Name: {exercise.name}</p>
                <p>Category: {exercise.category}</p> 
                <p>Description: {exercise.description}</p>
                <br/>
            </article> 
          ))}
        </div>
          <p className={styles.author}>
            {`${workout.author.username} posted on
            ${new Date(workout.createdAt).toLocaleDateString()}`}
          </p>
          {workout.author._id === user._id && (
            <div className={styles.actions}>
            <Link to={`/workouts/${workoutId}/edit`} className={styles.editButton}>Edit</Link>
            <button onClick={() => props.handleDeleteWorkout(workoutId)} className={styles.deleteButton}>Delete</button>
            </div>
          )}
      </section>
      <section className={styles.commentsSection}>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>

        {!workout.comments.length && <p>There are no comments.</p>}
        <div className={styles.commentsList}>
        {workout.comments.map((comment) => (
            <article key={comment._id} className={styles.commentCard}>
                <header>
                    <p>
                      {`${comment.author.username} posted on
                      ${new Date(comment.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{comment.text}</p>
            </article>
        ))}
        </div>
      </section>
    </main>
    )
};

export default WorkoutDetails;