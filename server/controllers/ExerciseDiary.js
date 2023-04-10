//Most of these controllers are just slightly modified versions of the food diary entry controllers.
//Basically, we receive the exercise from the API, which provides basic exercise information.
//We then can log the information with an associated User and date.

const express = require('express')
const Exercise = require('../models/ExerciseDiaryEntry.js')
const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('../errors/CustomApiError.js')

//Post an exercise entry
const CreateEntry = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const exerciseEntry = await Exercise.create(req.body);

    res.status(StatusCodes.CREATED).json({exerciseEntry})
}

//Get all of the entries in a given day for the current user.
const ReadAllEntries = async (req, res)=> {
    if(!req.query.DiaryDate)
    {
        throw new CustomAPIError('A date must be provided for exercise diary queries.', StatusCodes.BAD_REQUEST);
    }

    const date = new Date(req.query.DiaryDate);

    //Get All the foods posted on the given date, starting at the beginning of the day, until 11:59:59... PM
    const exercises = await Exercise.find({
        createdBy: req.user.userId,
        DiaryDate: {
            $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        }
    }).sort('createdAt');

    res
        .status(StatusCodes.OK)
        .json({
            exercises,
            count: exercises.length
        })
}

//Get a single diary entry using an ID
const ReadSingleEntry = async (req, res)=> {
    const {
        user: {userId},
        params: {id: exerciseEntryId}
    } = req;

    const exerciseEntry = await Exercise.findOne({
        _id: exerciseEntryId,
        createdBy: userId
    })

    if(!exerciseEntry)
    {
        throw new CustomAPIError(`No exercise entry found with id ${exerciseEntryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({exerciseEntry});
}

//Patch request, modify an entry (for serving size change)
const UpdateEntry = async (req, res) => {
    //Deconstruct the request into its constituent parts
    const {
        body: {
            met,            
            weightDuringExercise,
            exerciseDuration,
            DiaryDate,
        },
        user: {userId},
        params: {id: exerciseEntryId}
    } = req;

    //If a required body field isn't found, throw an error
    if(!met || !DiaryDate || !weightDuringExercise || !exerciseDuration)
    {
        throw new CustomAPIError(
            'One of the necessarily provided fields is missing. Please provide met, weightDuringExercise, exerciseDuration, and DiaryDate',
            StatusCodes.BAD_REQUEST);
    }

    //Assign the required fields to a new object to pass into findOneAndUpdate
    const fieldsToUpdate = {
        met: met,            
        weightDuringExercise: weightDuringExercise,
        exerciseDuration: exerciseDuration,
        caloriesBurned: 0.453592 * weightDuringExercise * met / 60 * exerciseDuration ,
        DiaryDate: new Date(DiaryDate)
    }

    //Check the object (not entirely necessary)
    for(const [key, value] of Object.entries(fieldsToUpdate))
    {
        if(!value)
        {
            delete fieldsToUpdate[key];
        }
    }

    //Use findOneAndUpdate with the {$set: {...fieldsToUpdate}} param
    //This allows us to only update the provided fields
    const exerciseEntry = await Exercise.findOneAndUpdate({
        _id: exerciseEntryId,
        createdBy: userId
    },
    {$set: {...fieldsToUpdate}},
    {new: true, runValidators: true})

    res.status(StatusCodes.OK).json({exerciseEntry})
}  

//Delete a food item from the daily diary
const DeleteEntry = async (req, res) => {
    const {
        user: userId,
        params: {id: exerciseEntryId}
    } = req;

    const exerciseEntry = Exercise.findByIdAndRemove({
        _id: exerciseEntryId,
        createdBy: userId
    })

    if(!exerciseEntry)
    {
        throw new CustomAPIError(`No exercise entry found with ID ${exerciseEntryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).send('Exercise item was successfully removed');
}

module.exports = {
    CreateEntry,
    ReadAllEntries,
    ReadSingleEntry,
    UpdateEntry,
    DeleteEntry
}