const errorHandler = (err, req, res, next) => {
	console.error(err)

	if (err.type === 'entity.parse.failed') {
		return res.status(400).json({message: 'Invalid JSON'})
	}
	if (err.name === 'ValidationError') {
		return res.status(400).json({message: err.message})
	}
	if (err.name === 'CastError') {
		return res.status(400).json({message: 'Invalid ID'})
	}

	return res.status(500).json({message: 'Server Error'})
}

module.exports = errorHandler
