const express = require('express')
const router = express.Router();

const {
    CreateEntry,
    ReadEntries,
    UpdateEntry,
    DeleteEntry
} = require('../controllers/WeightDiary.js')

router.route('/').post(CreateEntry).get(ReadEntries);
router.route('/:id').patch(UpdateEntry).delete(DeleteEntry)

module.exports = router;