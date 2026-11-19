const express = require('express')
const router = express.Router()
const { getPlaces, postPlace, deletePlace } = require('../controllers/placesControllers')

router.get('/', getPlaces)
router.post('/', postPlace)
router.delete('/:id', deletePlace)

module.exports = router