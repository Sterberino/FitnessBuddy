const express = require('express')
const Weight = require('../models/Weight.js')
const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('../errors/CustomApiError.js')

//Post a food entry
const CreateEntry = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const date = req.body.DiaryDate;
    
    const ExistingWeightEntry = await Weight.findOne({DiaryDate: date})
    if(ExistingWeightEntry)
    {
        throw new CustomAPIError(
            'An entry for the given date already exists. If you wish to update it, please make a PATCH request.', 
            StatusCodes.BAD_REQUEST
        )
    }

    const WeightEntry = await Weight.create(req.body);
    res.status(StatusCodes.CREATED).json({WeightEntry})
}

//Get all of the entries in a given day for the current user.
const ReadEntries = async (req, res)=> {
    const date = req.body.DiaryDate;

    //If a date is provided in the request body, get only the information for that day.
    if(date)
    {
        const WeightEntry = await Weight.findOne({
            DiaryDate: new Date(date),
            createdBy: req.user.userId
        })
    
        if(!WeightEntry)
        {
            throw new CustomAPIError(`No weight entry found on date ${date}`, StatusCodes.NOT_FOUND)
        }
    
        return res.status(StatusCodes.OK).json({WeightEntry});
    }

    //Get all the weight entries posted by the given user if a date is not provided in the body.
    const weightEntries = await Weight.find({
        createdBy: req.user.userId
    }).sort({DiaryDate: 1});

    res
        .status(StatusCodes.OK)
        .json({
            weightEntries,
            count: weightEntries.length
        })
}

//Patch request, modify an entry (for serving size change)
const UpdateEntry = async (req, res) => {
    //Deconstruct the request into its constituent parts
    const {
        body: {
            DiaryDate, 
            userWeight
        },
        user: {userId},
        params: {id: weightEntryId}
    } = req;

    //If a required body field isn't found, throw an error
    if(!userWeight || !DiaryDate)
    {
        throw new CustomAPIError(
            'One of the necessarily provided fields is missing. Please provide userWeight and DiaryDate',
            StatusCodes.BAD_REQUEST);
    }

    //Assign the required fields to a new object to pass into findOneAndUpdate
    const fieldsToUpdate = {
        userWeight: userWeight,
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
    const weightEntry = await Weight.findOneAndUpdate({
        _id: weightEntryId,
        createdBy: userId
    },
    {$set: {...fieldsToUpdate}},
    {new: true, runValidators: true})

    res.status(StatusCodes.OK).json({weightEntry})
} 

//Delete a food item from the daily diary
const DeleteEntry = async (req, res) => {
    const {
        user: userId,
        params: {id: weightEntryId}
    } = req;

    const weightEntry = await Weight.findByIdAndRemove({
        _id: weightEntryId,
        createdBy: userId
    })

    if(!weightEntry)
    {
        throw new CustomAPIError(`No weight entry found with ID ${weightEntryId}`, StatusCodes.NOT_FOUND)
    }
    console.log(weightEntryId);
    res.status(StatusCodes.OK).send('Weight entry was successfully removed');
}

module.exports = {
    CreateEntry,
    ReadEntries,
    UpdateEntry,
    DeleteEntry
}