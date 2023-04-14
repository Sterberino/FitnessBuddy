const express = require('express')
const Food = require('../models/Food.js')
const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('../errors/CustomApiError.js')

//Post a food entry
const CreateEntry = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const foodEntry = await Food.create(req.body);

    res.status(StatusCodes.CREATED).json({foodEntry})
}

//Get all of the entries in a given day for the current user if the date is provided. Otherwise, get the most recent 20 entries, sorted by recency.
const ReadAllEntries = async (req, res)=> {
    if(!req.query.DiaryDate)
    {
        const foods = await Food.find({
           createdBy: req.user.userId,
        }).limit(20).sort({createdAt: -1});

        return res
        .status(StatusCodes.OK)
        .json({
            foods,
            count: foods.length
        })
    }
    else{
        const date = new Date(req.query.DiaryDate);

        //Get All the foods posted on the given date, starting at the beginning of the day, until 11:59:59... PM
        const foods = await Food.find({
            createdBy: req.user.userId,
            DiaryDate: {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            }
        }).sort('createdAt');
    
        return res
            .status(StatusCodes.OK)
            .json({
                foods,
                count: foods.length
            })
    }   
}

//Get a single diary entry using an ID
const ReadSingleEntry = async (req, res)=> {
    const {
        user: {userId},
        params: {id: foodEntryId}
    } = req;

    const foodEntry = await Food.findOne({
        _id: foodEntryId,
        createdBy: userId
    })

    if(!foodEntry)
    {
        throw new CustomAPIError(`No food entry found with id ${foodEntryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({foodEntry});
}

//Patch request, modify an entry (for serving size change)
const UpdateEntry = async (req, res) => {
    //Deconstruct the request into its constituent parts
    const {
        body: {
            name,
            Servings,
            Meal,
            DiaryDate
        },
        user: {userId},
        params: {id: foodEntryId}
    } = req;

    //If a required body field isn't found, throw an error
    if(!name || !Servings || !Meal || !DiaryDate)
    {
        throw new CustomAPIError(
            'One of the necessarily provided fields is missing. Please provide Name, Servings, Meal, DiaryDate',
            StatusCodes.BAD_REQUEST);
    }

    //Assign the required fields to a new object to pass into findOneAndUpdate
    const fieldsToUpdate = {
        name: name,
        Servings: Servings,
        Meal: Meal,
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
    const foodEntry = await Food.findOneAndUpdate({
        _id: foodEntryId,
        createdBy: userId
    },
    {$set: {...fieldsToUpdate}},
    {new: true, runValidators: true})

    res.status(StatusCodes.OK).json({foodEntry})
} 

//Delete a food item from the daily diary
const DeleteEntry = async (req, res) => {
    const {
        user: userId,
        params: {id: foodEntryId}
    } = req;

    const foodEntry = await Food.findByIdAndRemove({
        _id: foodEntryId,
        createdBy: userId
    })

    if(!foodEntry)
    {
        throw new CustomAPIError(`No food entry found with ID ${foodEntryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).send('Food item was successfully removed');
}

module.exports = {
    CreateEntry,
    ReadAllEntries,
    ReadSingleEntry,
    UpdateEntry,
    DeleteEntry
}