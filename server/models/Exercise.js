const mongoose = require('mongoose')

//This schema maps to the information retrieved from the Calorie Ninjas API,
//with the addition of a user associated with the entry
const ExerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: [true, 'Please provide a name for the exercise entry.']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for the exercise entry.']
    },
    met: {
        type: Number, 
        required: [true, 'Please provide an MET for the exercise entry.']
    }
},
{timestamps: false})

module.exports = mongoose.model("Exercise", ExerciseSchema);