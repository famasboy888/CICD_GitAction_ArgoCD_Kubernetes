require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workoutRouter');
const mongoose = require('mongoose');
const cors = require('cors')

const mongo_uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+process.env.MONGO_API

const app = express();

app.use(cors());

// Allow to get post Request body
app.use(express.json());

// Adding a middle ware
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
})

//Routes
app.use('/api/workouts', workoutRoutes);

// Connect to db
mongoose.connect(mongo_uri)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening to port:"+process.env.PORT);
        });
    })
    .catch((e) => {
        console.log(e);
    });



