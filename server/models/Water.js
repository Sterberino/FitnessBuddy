const mongoose = require('mongoose')

const WaterSchema = new mongoose.Schema({
    volume: {
        type: Number,
        required: [true, 'Please provide the volume for the water entry.']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user associated with the entry.']
    },
    DiaryDate: {
        type: Date,
        required: [true, 'Please provide a DiaryDate associated with the entry']
    }
});

module.exports = mongoose.model('WaterEntry', WaterSchema);