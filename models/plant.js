const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    apiID : String,
    common_name : String,
    scientific_name : [],
    origin: [],
    type: String,
    watering : String,
    wateringDescription: String,
    sunlight : [],
    sunlightDescription: String,
    care_level: String,
    img : {
        regular_url: '',
        thumbnail: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)