const express = require('express');
const request = require('request');
const ConnectDB = require('./db/connect.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const authenticationMiddleware = require('./middleware/authentication.js');

require('express-async-errors');
require('dotenv').config();

const app = express();
app.use(express.json());

//Routers
const ExerciseDiaryRouter = require('./routes/ExerciseDiary.js');
const FoodDiaryRouter = require('./routes/FoodDiary.js');
const APIRequestRouter = require('./routes/APIRequests.js');
const AuthenticationRouter = require('./routes/auth.js');
const WeightDiaryRouter = require('./routes/WeightDiary.js');
const WaterDiaryRouter = require('./routes/WaterDiary.js');
const { StatusCodes } = require('http-status-codes');
app.use('/api/v1/search', APIRequestRouter);
app.use('/api/v1/auth', AuthenticationRouter);
app.use('/api/v1/foodDiary', authenticationMiddleware, FoodDiaryRouter);
app.use('/api/v1/exerciseDiary', authenticationMiddleware, ExerciseDiaryRouter);
app.use('/api/v1/weightDiary', authenticationMiddleware, WeightDiaryRouter);
app.use('/api/v1/waterDiary', authenticationMiddleware, WaterDiaryRouter)


//Middleware
app.use(errorHandlerMiddleware);

const port = 3001;

const Start = async ()=>{
    try{
        await ConnectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server listening at port ${port}`)
        })
    } catch(err)
    {
        console.log(err)
    }
}

Start();