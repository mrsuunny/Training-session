const mongoose = require('mongoose')
const Place = require('../models/Place')

const getPlaces = async (req, res) => {
	try {
		const places = await Place.find()
		res.json(places)
	} catch (err) {
		res.status(500).json({message: 'Server Error'})
	}
}

const postPlace = async (req, res) => {
	try{
		const {name, activity} = req.body

		if (typeof name !== 'string' || name.trim() === '' || typeof activity !== 'string' || activity.trim() === '') {
			return res.status(400).json({message: 'Please fill both Fields'})
		}
		const newPlaces = await Place.create({ name: name.trim(), activity: activity.trim() })
		res.status(201).json(newPlaces)
	} catch (err) {
		res.status(500).json({message: 'Server Error'})
	}
}

const deletePlace = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({message: 'invalid ID'})
		}
		const deleted = await Place.findByIdAndDelete(req.params.id)
		if (!deleted) {
			return res.status(404).json({message: 'Place not Found'})
		}
		res.json({message: 'Deleted'})
	} catch (err) {
		res.status(500).json({message: 'Server Error'})
	}
}

const updatePlace = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({message: 'Invalid ID'})
		}

		const {name, activity} = req.body

		if (typeof name !== 'string' || name.trim() === '' || typeof activity !== 'string' || activity.trim() === '') {
			return res.status(400).json({message: 'Please fill both Fields'})
		}

		const updated = await Place.findByIdAndUpdate(
			req.params.id,
			{ name: name.trim(), activity: activity.trim() },
			{ new: true, runValidators: true }
		)

		if(!updated) {
			return res.status(404).json({message: 'User not Found'})
		}

		res.json(updated)

	} catch (err) {
		res.status(500).json({message: 'Server Error'})
	}
}

module.exports = {getPlaces, postPlace, deletePlace, updatePlace}
