import { useState, useEffect } from "react";
import * as exerciseService from '../../services/exerciseService'

const ExerciseForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Back',
        description: '',
    });
     const [exercises, setExercises] = useState([]);

        useEffect(() => {
            const fetchAllExercises = async () => {
                const exerciseData = await exerciseService.index();
                setExercises(exerciseData);
            }
            fetchAllExercises();
        }, [])

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddExercise(formData);
        setFormData({ name: "", 
            category: "Back", 
            description: "" 
        }); 
    }

    return (
        <main>
            <h1>Submit an Exercise</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Name</label>
                <input
                required
                type="text"
                name="name"
                id="name-input"
                value={formData.name}
                onChange={handleChange}
                />
                <label htmlFor='category-input'>Category</label>
                <select
                required
                name='category'
                id='category-input'
                value={formData.category}
                onChange={handleChange}
                >
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
                <label htmlFor="description-input">Description</label>
                <textarea
                type="text"
                name="description"
                id="description-input"
                value={formData.description}
                onChange={handleChange}
                />
                <button type="submit">Submit Exercise</button>
            </form>
            <div>
                <ul>
                    {exercises.length > 0 ?(
                        exercises.map((exercise) => (
                            <li key={exercise._id}>
                                <h2>Name: {exercise.name} </h2>
                                <h3>Category: {exercise.category}</h3>
                                <p>Dexcription: {exercise.description}</p>
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

export default ExerciseForm;