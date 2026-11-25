const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const {signup, login} = require('../controllers/authControllers')
const validate = require('../middleware/validate')
const { signupSchema, loginSchema } = require('../schemas/auth')

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {message: 'Too many attempst, try again later'}
})
router.post('/signup', authLimiter, validate(signupSchema), signup)
router.post('/login', authLimiter, validate(loginSchema), login)

module.exports = router
