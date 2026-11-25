const { z } = require('zod')
const validate = require('../middleware/validate')

const placeSchema = z.object({
    name: z.string().trim().min(1, 'name is required'),
    activity: z.string().trim().min(1, 'activity is required')
})

module.exports = { placeSchema }