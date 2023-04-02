const mongoose = require('mongoose')

//This schema maps to the information retrieved from the Calorie Ninjas API,
//with the addition of a user associated with the entry
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
    Servings: {
        type: Number,
        required: [true, 'Please provide the number of servings.']
    },
    Meal : {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        required: [true, "Please provide a meal associated with the food entry."]
    },
    DiaryDate: {
        type: Date,
        reuired: [true, 'Please provide the date that the food was added to the diary.']
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user associated with this entry.']
    }
},
{timestamps: true})

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);