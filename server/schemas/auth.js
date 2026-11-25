const { z } = require('zod')
const validate = require('../middleware/validate')

const signupSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	email: z.string().trim().toLowerCase().email('Invalid email'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
})

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email('Invalid Email'),
    password: z.string().min(1, 'Password is Required')
})

module.exports = { signupSchema, loginSchema }