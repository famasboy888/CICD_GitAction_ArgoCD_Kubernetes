import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const jsonResponse = await response.json();

        console.log(jsonResponse.ok)

        if (!response.ok) {
            setError(jsonResponse.error)
        } else if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            dispatch({ type: 'CREATE_WORKOUT', payload: jsonResponse });
        }
    }

    return (
        <form className="create" onSubmit={submitHandler}>
            {error && <div className="error">Error: {error}</div>}
            <h3>Add new workout</h3>
            <label>Workout Title</label>
            <input
                required
                type="text"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
            />
            <label>Load (Kg)</label>
            <input
                required
                type="number"
                onChange={(e) => { setLoad(e.target.value) }}
                value={load}
            />
            <label>Repetitions</label>
            <input
                required
                type="number"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps}
            />

            <button>Add Workout</button>
        </form>
    );
}

export default WorkoutForm;