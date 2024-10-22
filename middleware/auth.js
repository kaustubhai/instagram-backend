const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token') || req.cookies.token

    if (!token)
        return res.status(401).json({ msg: "Unathorised Access" })
    try {
        const decoded = jwt.verify(token, process.env.SECURITY_KEY)

        req.user = decoded.user
        next()
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Token is not Valid"})
    }
}