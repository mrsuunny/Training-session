const places = [
	{id: 1, name: 'Skardu', activity: 'Mountain Climbing'},
	{id: 2, name: 'Bali', activity: 'Surfing'},
	{id: 3, name: 'Dubai', activity: 'Skydiving'}
]

const getPlaces = (req, res) => {
	res.json(places)
}

const postPlace = (req, res) => {
	const {name, activity} = req.body

	if (typeof name !== 'string' || name.trim() === '' || typeof activity !== 'string' || activity.trim() === '') {
		return res.status(400).json({message: 'Please fill both Fields'})
	}
	const newPlaces = {
		id: Date.now(),
		name: name.trim(),
		activity: activity.trim()
	}
	places.push(newPlaces)
	res.json(newPlaces)
}

const deletePlace = (req, res) => {
	const id = Number(req.params.id)
	const index = places.findIndex((p) => p.id === id)

	if (index === -1) {
		return res.status(404).json({message: 'Place not Found'})
	}

	places.splice(index, 1)
	res.json({message: 'Deleted'})
}

module.exports = {getPlaces, postPlace, deletePlace}
