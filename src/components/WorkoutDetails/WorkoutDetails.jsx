import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CommentForm from "../CommentForm/CommentForm";

import * as workoutService from '../../services/workoutService';

const WorkoutDetails = () => {
    const [workout, setWorkout] = useState(null);
    const { workoutId } = useParams();

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
    <main>
      <section>
        <header>
          <h1>{workout.name}</h1>
        </header>
          <h2>Intensity Level: {workout.rating}</h2>
          {workout.exercises.map((exercise) => (
            <article key={exercise._id}>
                <p>Exercise Name: {exercise.name}</p>
                <p>Category: {exercise.category}</p> 
                <p>Description: {exercise.description}</p>
                <br/>
            </article> 
          ))}
          <p>
            {`${workout.author.username} posted on
            ${new Date(workout.createdAt).toLocaleDateString()}`}
          </p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>

        {!workout.comments.length && <p>There are no comments.</p>}

        {workout.comments.map((comment) => (
            <article key={comment._id}>
                <header>
                    <p>
                      {`${comment.author.username} posted on
                      ${new Date(comment.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{comment.text}</p>
            </article>
        ))}
      </section>
    </main>
    )
};

export default WorkoutDetails;