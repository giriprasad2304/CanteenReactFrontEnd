const jwt = require('jsonwebtoken')

async function authenticateUser(req, res, next) {
    let token = req.cookies?.token
    if (!token) {
        const authHeader = req.headers['authorization']
        if (authHeader?.startsWith('Bearer ')) token = authHeader.split(' ')[1]
    }

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = { authenticateUser }