const mongoose = require('mongoose')

const WeightEntrySchema = new mongoose.Schema({
    Weight: {
        type: Number,
        required: [true, 'Please provide your weight in lbs'] 
    },
    DiaryDate: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user associated with this entry']
    }
})

module.exports = mongoose.model('WeightEntry', WeightEntrySchema);