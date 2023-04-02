const express = require('express');
const router = express.Router();

//Get the controller functions
const {
    CreateEntry,
    ReadAllEntries,
    ReadSingleEntry,
    UpdateEntry,
    DeleteEntry
} = require('../controllers/FoodDiary.js');

//Route the C R U D functions to post, get, update, delete
router.route('/').post(CreateEntry).get(ReadAllEntries);
router.route('/:id').get(ReadSingleEntry).patch(UpdateEntry).delete(DeleteEntry);

module.exports = router;