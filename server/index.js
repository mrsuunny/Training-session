const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const places = [
	{id: 1, name: 'Skardu', activity: 'Mountain Climbing'},
	{id: 2, name: 'Bali', activity: 'Surfing'},
	{id: 3, name: 'Dubai', activity: 'Skydiving'}
]

app.get('/api/places', (req, res) => {
	res.json(places)
})

app.post('/api/places', (req, res) => {
	const newPlaces = {
		id: Date.now(),
		name: req.body.name,
		activity: req.body.activity
	}
	res.json(newPlaces)
	places.push(newPlaces)
})

app.delete('/api/places/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = places.findIndex((p) => p.id === id)

    if (index === -1){
        return res.status(404).json({ messsage : "Index not Found" })

    }

    places.splice(index, 1)
    res.json({ message : "Deleted" })
})

app.listen(5000, () => {
	console.log('Port is Listening at 5000')
})
