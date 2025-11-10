import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as exerciseService from '../../services/exerciseService';
import { UserContext } from "../../contexts/UserContext";

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
    <main>
      <section>
        <header>
          <h1>{exercise.name}</h1>
          <h2>Category: {exercise.category}</h2>
          <p>Description: {exercise.description}</p>
          <p>
            {`${exercise.author.username} posted on
            ${new Date(exercise.createdAt).toLocaleDateString()}`}
          </p>
          {exercise.author._id === user._id && (
            <>
            <button onClick={() => props.handleDeleteExercise(exerciseId)}>Delete</button>
            </>
          )}
        </header>
      </section>
    </main>
  );
}


export default ExerciseDetails;