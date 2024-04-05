const workoutModel = require('../models/WorkoutModels');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (request, response) => {
    try {
        const workout = await workoutModel.find({}).sort({ createdAt: -1 });
        response.status(200).json(workout);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

// get single workouts
const getWorkoutById = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(404).json({ error: "No such workout!" });
    } else {
        try {
            const workout = await workoutModel.findById(id);
            if (!workout) {
                response.status(400).json({ error: "No such workout!" });
            } else {
                response.status(200).json(workout);
            }
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

// add new workouts
const createWorkout = async (request, response) => {
    const { title, load, reps } = request.body;

    try {
        const newWorkout = await workoutModel.create({ title, load, reps });
        response.status(200).json(newWorkout);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

// delete a workout
const deleteWorkoutById = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(404).json({ error: "No such workout!" });
    } else {
        try {
            const workout = await workoutModel.findOneAndDelete({ _id: id });
            if (!workout) {
                response.status(400).json({ error: "No such workout!" });
            } else {
                response.status(200).json(workout);
            }
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

// update a workout
const updateWorkoutById = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(404).json({ error: "No such workout!" });
    } else {
        try {

            const workout = await workoutModel.findOneAndUpdate(
                { _id: id },
                { ...request.body },
                { new: true }
            );

            if (!workout) {
                response.status(400).json({ error: "No such workout!" });
            } else {
                response.status(200).json(workout);
            }
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}


module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkoutById,
    updateWorkoutById
}