const express = require('express');
const request = require('request');
const ConnectDB = require('./db/connect.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const authenticationMiddleware = require('./middleware/authentication.js');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
require('express-async-errors');
require('dotenv').config();
const path = require('node:path');

const app = express();
app.use(express.json());

app.use(xss());
app.use(cors())
app.use(helmet());
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  })
);

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

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});


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