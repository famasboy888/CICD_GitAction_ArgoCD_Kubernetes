import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            console.log(action.payload)
            return{
                workouts: action.payload
            } 
        case 'CREATE_WORKOUT':
            console.log(state.workouts)
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            console.log(state.workouts)
            return{
                workouts: state.workouts.filter((w) => (
                     w._id !== action.payload._id
                ))
            }
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    );
}