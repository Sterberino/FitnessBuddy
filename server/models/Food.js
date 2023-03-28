const mongoose = require('mongoose')

const FoodEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the food entry.'],
        maxLength: 50
    },
    calories: {
        type: Number,
       default: 0
    },
    serving_size_g: {
        type: Number,
        default: 100
    },
    fat_total_g: {
        type: Number,
        default: 0
    },
    fat_saturated_g: {
        type: Number,
        default: 0
    },
    protein_g: {
        type: Number,
        default: 0
    },
    sodium_mg: {
        type: Number,
        default: 0
    },
    potassium_mg: {
        type: Number,
        default: 0
    },
    cholesterol_mg: {
        type: Number,
        default: 0
    },
    carbohydrates_total_g: {
        type: Number,
        default: 0
    },
    fiber_g: {
        type: Number,
        default: 0
    },
    sugar_g: {
        type: Number,
        default: 0
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user associated with this entry.']
    }
},
{timestamps: true})

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);