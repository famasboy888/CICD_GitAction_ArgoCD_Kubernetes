const express = require('express');

const { getAllWorkouts,
        getWorkoutById,
        createWorkout,
        deleteWorkoutById,
        updateWorkoutById
} = require('../controllers/workoutController')

const router = express.Router();

// Get all workouts
router.get('/', getAllWorkouts);

// Get single workouts
router.get('/:id', getWorkoutById);

// Post single workouts
router.post('/', createWorkout);

// Delete single workouts
router.delete('/:id', deleteWorkoutById);

// Update single workouts
router.patch('/:id', updateWorkoutById);

module.exports = router;