const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const placeRouter = require('./routes/places')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json({ limit: '10kb' }))

app.use('/api/places', placeRouter)
app.use('/api/auth', require('./routes/auth'))
app.use(notFound)
app.use(errorHandler)

module.exports = app
