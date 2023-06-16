const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    apiID : String,
    care_level: String,
    common_name : String,
    description: String,
    img : {
        regular_url: '',
        thumbnail: ''
    },
    origin: [],
    scientific_name : [],
    sunlight : [],
    sunlightDescription: String,
    type: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    watering : String,
    wateringDescription: String,
    wateredOn : []
}, {
    timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)