const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    apiID : String,
    common_name : String,
    watering : String,
    wateringDescription: String,
    sunlight : [],
    sunlightDescription: String,
    pruningDescription: String,
    img : {
        regular_url: '',
        thumbnail: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)