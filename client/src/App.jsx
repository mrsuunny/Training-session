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

		const isEditing = editingID !== null
		const url = isEditing ? `http://localhost:5000/api/places/${editingID}` : `http://localhost:5000/api/places`

		fetch(url, {
			method: isEditing ? 'PUT' : 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({name, activity})
		})
			.then((res) => res.json().then((data) => ({ok: res.ok, data})))
			.then(({ok, data}) => {
				if (!ok) {
					setError(data.message)
					return
				}
				if (isEditing) {
					setPlaces(places.map((p) => (p._id === editingID ? data : p)))
				} else {
					setPlaces([...places, data])
				}
				setEditingID(null)
				setName('')
				setActivity('')
			})
			.catch(() => setError('Could Not Reach Server'))
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
			{error && <p style={{color: 'red'}}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<input value={activity} onChange={(e) => setActivity(e.target.value)} />
				<button type="submit">{editingID ? 'Update' : 'Add'}</button>
			</form>
			<ul>
				{places.map((place) => (
					<li key={place._id}>
						{place.name} - {place.activity}
						<button onClick={() => handleDelete(place._id)}>Delete</button>
						<button
							onClick={() => {
								setEditingID(place._id)
								setName(place.name)
								setActivity(place.activity)
							}}>
							Edit
						</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default App
