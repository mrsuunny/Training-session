import {useEffect, useState} from 'react'

function App() {
	const [places, setPlaces] = useState([])
	const [name, setName] = useState('')
	const [activity, setActivity] = useState('')

	useEffect(() => {
		fetch('http://localhost:5000/api/places')
			.then((res) => res.json())
			.then((data) => setPlaces(data))
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('http://localhost:5000/api/places', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({name, activity})
		})
			.then((res) => res.json())
			.then((newPlace) => {
				setPlaces([...places, newPlace])
				setName('')
				setActivity('')
			})
	}

	const handleDelete = (id) => {
		fetch(`http://localhost:5000/api/places/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then(() => {
				setPlaces(places.filter((place) => place.id !== id))
			})
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<input value={activity} onChange={(e) => setActivity(e.target.value)} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{places.map((place) => (
					<li key={place.id}>
						{place.name} - {place.activity}
						<button onClick={() => handleDelete(place.id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default App
