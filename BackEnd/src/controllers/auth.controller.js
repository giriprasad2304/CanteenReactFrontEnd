const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function signup(req, res) {
    try {
        const { username, email, password, role } = req.body
        const exists = await userModel.findOne({ email })
        if (exists) return res.status(409).json({ message: 'Email Exists Please Login' })

        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({ username, email, password: hash, role })
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

        return res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })
    } catch (err) {
        console.error('Signup error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) return res.status(401).json({ message: 'Invalid Credentials' })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ message: 'Invalid Credentials' })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
        res.cookie('token', token)

        return res.status(200).json({
            message: 'Login Successful',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })
    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function logout(req, res) {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout Successfull' })
}

module.exports = { signup, login, logout }