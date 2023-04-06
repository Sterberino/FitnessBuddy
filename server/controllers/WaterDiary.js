const express = require('express')
const CustomAPIError = require('../errors/CustomApiError.js')
const {StatusCodes} = require('http-status-codes')
const Water = require('../models/Water.js')


const CreateEntry = async (req, res) => {
    req.body.createdBy = req.user.userId;
    
    const waterEntry = await Water.create(req.body)
    res.status(StatusCodes.CREATED).json({waterEntry})
}

const ReadEntries = async (req, res) => {
    if(!req.body.DiaryDate)
    {
        throw new CustomAPIError('No date provided for the query', StatusCodes.BAD_REQUEST);
    }

    const date = new Date(req.body.DiaryDate);

    const waterEntries = await Water.find({
        createdBy: req.user.userId,
        DiaryDate: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }}).sort('createdAt');

    res
    .status(StatusCodes.OK)
    .json({
        waterEntries,
        count: waterEntries.length
    })
}

const ReadSingleEntry = async (req, res)=> {
    if(!req.params.id)
    {
        throw new CustomAPIError('Please provide an id for the entry query.', StatusCodes.BAD_REQUEST);
    }

    const entry = await Water.findOne({_id: req.params.id, createdBy: req.user.userId});

    if(!entry)
    {
        throw new CustomAPIError(`No entry found with ID: ${req.params.id}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({entry})
}

const UpdateEntry = async (req, res) => {
    const entryId = req.params.id;
    const userId = req.user.userId;
    const {volume, DiaryDate} = req.body;

    if(!volume|| !DiaryDate)
    {
        throw new CustomAPIError('Please provide a volume and date associated with the entry.');
    }

    const fieldsToUpdate = {
        volume: volume,
        DiaryDate: DiaryDate
    }

    for(const [key, value] of Object.entries(fieldsToUpdate))
    {
        if(!value)
        {
            delete fieldsToUpdate[key];
        }
    }

    const entry = await Water.findOneAndUpdate(
        {_id: entryId, createdBy: userId}, 
        {$set: {...fieldsToUpdate}}, 
        {new: true, runValidators: true}
    );
    
    if(!entry)
    {
        throw new CustomAPIError(`No entry found with ID: ${entryId}`, StatusCodes.NOT_FOUND);
    }
    
    res.status(StatusCodes.OK).json({entry});
}
const DeleteEntry = async (req, res) => {
    const entryId = req.params.id;
    const userId = req.user.userId;

    const entry = await Water.findOneAndRemove({_id: entryId, createdBy: userId});

    if(!entry)
    {
        throw new CustomAPIError(`No entry found with ID: ${entryId}`, StatusCodes.NOT_FOUND);
    }
    
    res.status(StatusCodes.OK).send(`Successfully removed item with ID: ${entryId}`);
}


module.exports = {
    CreateEntry,
    ReadEntries,
    ReadSingleEntry,
    UpdateEntry,
    DeleteEntry
}