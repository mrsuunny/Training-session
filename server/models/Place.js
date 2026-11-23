const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
	name: {type: String, required: true, trim: true},
	activity: {type: String, required: true, trim: true}
})

module.exports = mongoose.model('Place', placeSchema)
