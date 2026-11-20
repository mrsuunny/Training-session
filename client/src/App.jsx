import {useEffect, useState} from 'react'
function App() {
	const [places, setPlaces] = useState([])
	const [name, setName] = useState('')
	const [activity, setActivity] = useState('')
	const [error, setError] = useState('')
	const [editingID, setEditingID] = useState(null)

	useEffect(() => {
		fetch('http://localhost:5000/api/places')
			.then((res) => res.json())
			.then((data) => setPlaces(data))
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		setError('')
		fetch('http://localhost:5000/api/places', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({name, activity})
		})
			.then((res) => res.json().then((data) => ({ok: res.ok, data})))
			.then(({ok, data}) => {
				if (!ok) {
					setError(data.message)
					return
				}
				setPlaces([...places, data])
				setName('')
				setActivity('')
			})
			.catch(() => setError('Server Fucked Up'))
	}

	const handleDelete = (id) => {
		fetch(`http://localhost:5000/api/places/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then(() => {
				setPlaces(places.filter((place) => place._id !== id))
			})
	}

	return (
		<>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<input value={activity} onChange={(e) => setActivity(e.target.value)} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{places.map((place) => (
					// new changes requires
					<li key={place._id}>
						{place.name} - {place.activity}
						<button onClick={() => handleDelete(place._id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default App
