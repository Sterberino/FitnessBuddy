const mongoose = require('mongoose')

//This schema maps to the information retrieved from the Calorie Ninjas API,
//with the addition of a user associated with the entry
const ExerciseDiaryEntrySchema = new mongoose.Schema({
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
    },
    DiaryDate: {
        type: Date,
        default: new Date()
    },
    weightDuringExercise: {
        type: Number,
        default: 160
    },
    exerciseDuration: {
        type: Number,
        default: 60
    },
    //(0.45kg / lb) * user weight * MET  = cal/hr. (cal/hr) / 60 = cal/min * duration in minutes is total burned cals
    caloriesBurned: {
        type: Number,
        default: 0
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user associated with this entry']
    }
},
{timestamps: true})

ExerciseDiaryEntrySchema.pre('save', async function(next)
{
    if(this.caloriesBurned === 0)
    {
        this.caloriesBurned =  0.453592 * this.weightDuringExercise * this.met / 60 * this.exerciseDuration;
    }
})

module.exports = mongoose.model("ExerciseDiaryEntry", ExerciseDiaryEntrySchema);