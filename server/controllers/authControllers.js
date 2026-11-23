const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
	const {name, email, password} = req.body

	if (typeof name !== 'string' || name.trim() === '' || typeof email !== 'string' || email.trim() === '' || typeof password !== 'string' || password.length < 8) {
		return res.status(400).json({message: 'Name, Email and Password (min 8 char)'})
	}

	const existing = await User.findOne({email: email.trim().toLowerCase()})
	if (existing) {
		return res.status(409).json({message: 'Email Already Existed'})
	}

	const hashed = await bcrypt.hash(password, 10)
	const user = await User.create({
		name: name.trim(),
		email: email.trim().toLowerCase(),
		password: hashed
	})
	return res.status(201).json({id: user._id, name: user.name, email: user.email})
}

// JSON WEB TOKEN

const login = async (req, res) => {
	const {email, password} = req.body

	if (typeof email !== 'string' || email.trim() === '' || typeof password !== 'string' || password === '') {
		return res.status(400).json({message: 'Email and password are required'})
	}

	const user = await User.findOne({email: email.trim().toLowerCase()})
	if (!user) {
		return res.status(401).json({message: 'Invalid email or password'})
	}

	if (!(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({message: 'Invalid email or password'})
	}

	const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

	return res.json({token, user: {id: user._id, name: user.name, email: user.email}})
}

module.exports = {signup, login}
