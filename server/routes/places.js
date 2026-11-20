const express = require('express')
const router = express.Router()
const { getPlaces, postPlace, deletePlace, updatePlace } = require('../controllers/placesControllers')

router.get('/', getPlaces)
router.post('/', postPlace)
router.delete('/:id', deletePlace)
router.put('/:id', updatePlace)

module.exports = router