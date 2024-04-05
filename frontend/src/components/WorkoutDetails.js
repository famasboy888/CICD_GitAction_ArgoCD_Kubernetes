import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();

    const deleteHandler = async (id) => {
        const response = await fetch('/api/workouts/' + id, {
            method: 'DELETE'
        });

        const jsonReponse = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: jsonReponse });
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Repetitions: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={() => { deleteHandler(workout._id) }}>DELETE</span>
        </div>
    );
}

export default WorkoutDetails;