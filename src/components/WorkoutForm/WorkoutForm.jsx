import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as exerciseService from '../../services/exerciseService'
import * as workoutService from '../../services/workoutService';
import styles from './WorkoutForm.module.css'



const WorkoutForm = (props) => {
    const { workoutId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        rating: 0,
        exercises: [],
    });
    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredExercises, setFilteredExercises] = useState([])

    useEffect(() => {
    const fetchWorkout = async () => {
      const workoutData = await workoutService.show(workoutId);
      setFormData(workoutData);
    };
    if (workoutId) fetchWorkout();
    return () => setFormData({ name: '', rating: 0, exercises: []})
  }, [workoutId]);


    useEffect(() => {
        const fetchAllExercises = async () => {
            const exerciseData = await exerciseService.index();
            setExercises(exerciseData);
            setFilteredExercises(exerciseData);
        }
        fetchAllExercises();
    }, [])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }


    useEffect(() =>{
        if(selectedCategory === "all") {
            setFilteredExercises(exercises);
        } else {
            const filtered = exercises.filter(
                (exercise) => exercise.category === selectedCategory
            )
            setFilteredExercises(filtered) 
        }
    }, [selectedCategory, exercises])

    const handleAddExercise = (exerciseId) => {
        const exerciseArray = [...formData.exercises, exerciseId];
        setFormData({
            ...formData,
            exercises: exerciseArray,
        })
    }

    const handleRemoveExercise = (exerciseToRemove) => {
        const updatedExercises = formData.exercises.filter((exercise) => exercise._id !== exerciseToRemove);
        setFormData({
            ...formData,
            exercises: updatedExercises
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormData({
            ...formData,
            exercises: formData.exercises.map((exercise ) => {
                return exercise._id
            })
        })
        if (workoutId) {
            props.handleUpdateWorkout(workoutId, formData)
        } else {
            props.handleAddWorkout(formData)
        }
    };


    return (
        <main className={styles.container}>
            <h1 className={styles.title}>
                {workoutId ? "Edit Workout" : "Create a Workout"}
                </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name-input">Workout Name</label>
                <input
                required
                type="text"
                name="name"
                id="name-input"
                value={formData.name}
                onChange={handleChange}
                />
                <label htmlFor="rating-input" placeholder='1-5'>Intensity Level</label>
                <input 
                required
                type="number"
                name="rating"
                id="rating-input"
                value={formData.rating}
                onChange={handleChange}
                />
                <label htmlFor="exercise-input">Exercises</label>
                <select 
                required
                name="exercises"
                id="exercise-input"
                onChange={handleCategoryChange}>
                    <option value="all">Show All</option>
                    <option value="Back">Back</option>
                    <option value="Chest">Chest</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Legs">Legs</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Abs">Abs</option>
                    <option value="Cardio">Cardio</option>
                </select>
                <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
            <div className={styles.content}>
                <section className={styles.selected}>
                <h2>Selected Exercises</h2>
                <ul>
                    {formData.exercises.length > 0 ? (
                        formData.exercises.map((exercise) => (
                            <li key={exercise._id} className={styles.exerciseItem}>
                                <h3>Name: {exercise.name}</h3>
                                <button className={styles.removeBtn} 
                                onClick={() => handleRemoveExercise(exercise._id)}>Remove Exercise</button>
                            </li>
                        ))
                    ) :(
                        <p>Add some exercises to your Workout!</p>
                    )}
                </ul>
                </section>
            </div>
                <section className={styles.available}>
                    <h2>Available Exercises</h2>
                    <ul className={styles.exerciseList}>
                        {filteredExercises.length > 0 ? (
                            filteredExercises.map((exercise) =>(
                                <li key={exercise._id} className={styles.exerciseCard}>
                                    <h2>Name: {exercise.name} </h2>
                                    <h3>Category: {exercise.category}</h3>
                                    <p>Description: {exercise.description}</p>
                                    <button className={styles.addBtn} onClick={() => handleAddExercise(exercise)}>Add Exercise</button>
                                </li>
                            ))
                        ) : (
                            <p>No exercises found!</p>
                        )}
                    </ul>
                </section>
        </main>
    )
}

export default WorkoutForm;