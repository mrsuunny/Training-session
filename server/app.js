const express = require('express')
const cors = require('cors')
const placeRouter = require('./routes/places')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/places', placeRouter)
app.use('/api/auth', require('./routes/auth'))
app.use(notFound)
app.use(errorHandler)

module.exports = app
