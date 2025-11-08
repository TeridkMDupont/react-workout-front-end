import { useEffect, useState } from "react";
import * as exerciseService from '../../services/exerciseService'

const WorkoutForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        exercises: '',
    });
    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredExercises, setFilteredExercises] = useState([])


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
        setFormData({...formData, [event.target.name]: event.target.value})
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

    const handleAddExercise = (exercise) => {
        const exerciseArray = [...formData.exercises, exercise];
        setFormData(exerciseArray)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddWorkout(formData)
    };


    return (
        <main>
            <form onSubmit={handleSubmit}>
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
                value={formData.exercises}
                onChange={handleCategoryChange}>
                    <option value="all">Show All</option>
                    <option value="Back">Back</option>
                    <option value="Chest">Chest</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Legs">Legs</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Abs">Abs</option>
                    <option value="cardio">Cardio</option>
                </select>
                <button type="submit">Submit</button>
            </form>
                <div>
                    <ul>
                        {filteredExercises.length > 0 ? (
                            filteredExercises.map((exercise) =>(
                                <li key={exercise._id}>
                                    {exercise.name}
                                    {exercise.category}
                                    {exercise.description}
                                    <button onClick={handleAddExercise}>Add Exercise</button>
                                </li>
                            ))
                        ) : (
                            <p>No exercises found!</p>
                        )}
                    </ul>
                </div>
        </main>
    )
}

export default WorkoutForm;