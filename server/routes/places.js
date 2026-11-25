const express = require('express')
const router = express.Router()
const {getPlaces, postPlace, deletePlace, updatePlace} = require('../controllers/placesControllers')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const { placeSchema } = require('../schemas/place')
router.use(auth)

router.get('/', getPlaces)
router.post('/', validate(placeSchema), postPlace)
router.delete('/:id', deletePlace)
router.put('/:id', validate(placeSchema), updatePlace)

module.exports = router
