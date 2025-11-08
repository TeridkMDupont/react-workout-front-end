import { useState } from "react";

const ExerciseForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Back',
        description: '',
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddExercise(formData);
    }

    return (
        <main>
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
        </main>
    )


}

export default ExerciseForm;