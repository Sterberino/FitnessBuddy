const express = require('express');
const router = express.Router();
const {   
    CreateEntry,
    ReadEntries,
    ReadSingleEntry,
    UpdateEntry,
    DeleteEntry
} = require('../controllers/WaterDiary.js');


router.route('/').post(CreateEntry).get(ReadEntries);
router.route('/:id').get(ReadSingleEntry).patch(UpdateEntry).delete(DeleteEntry);

module.exports = router;