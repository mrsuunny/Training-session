const mongoose = require('mongoose')
const Place = require('../models/Place')

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getPlaces = async (req, res) => {
	const page = Math.max(parseInt(req.query.page) || 1, 1)
	const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50)

	const filter = { user: req.user.id }

	if (typeof req.query.q === 'string' && req.query.q.trim() !== '') {
		const search = mongoose.trusted({
			$regex: escapeRegex(req.query.q.trim()),
			$options: 'i'
		})
		filter.$or = [{ name: search }, { activity: search }]
	}

	const [places, total] = await Promise.all([
		Place.find(filter)
			.sort({ _id: -1 })
			.skip((page - 1) * limit)
			.limit(limit),
		Place.countDocuments(filter)
	])

	res.json({
		data: places,
		page,
		limit,
		total,
		totalPages: Math.ceil(total / limit)
	})
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
