const mongoose = require('mongoose')
const Place = require('../models/Place')

const getPlaces = async (req, res) => {
	const places = await Place.find({user: req.user.id})
	res.json(places)
}

const postPlace = async (req, res) => {
	const {name, activity} = req.body

	const newPlaces = await Place.create({ name: name.trim(), activity: activity.trim(), user: req.user.id })
	res.status(201).json(newPlaces)
}

const deletePlace = async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).json({message: 'Invalid ID'})
	}
	const deleted = await Place.findOneAndDelete({ _id: req.params.id, user: req.user.id })
	if (!deleted) {
		return res.status(404).json({message: 'Place not Found'})
	}
	res.json({message: 'Deleted'})
}

const updatePlace = async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).json({message: 'Invalid ID'})
	}

	const {name, activity} = req.body

	const updated = await Place.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, {name: name.trim(), activity: activity.trim()}, {new: true, runValidators: true})

	if (!updated) {
		return res.status(404).json({message: 'Place not Found'})
	}

	res.json(updated)
}

module.exports = {getPlaces, postPlace, deletePlace, updatePlace}
