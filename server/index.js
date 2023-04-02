const express = require('express')
const request = require('request')
require('dotenv').config();
const ConnectDB = require('./db/connect.js')

const app = express()

app.use(express.json())

//Routers
const APIRequestRouter = require('./routes/APIRequests.js')
const AuthenticationRouter = require('./routes/auth.js');

app.use('/api/v1/search', APIRequestRouter);
app.use('/api/v1/auth', AuthenticationRouter);

const port = 3001

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