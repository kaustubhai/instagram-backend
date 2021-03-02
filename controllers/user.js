const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password, profile } = req.body;
            let user = await User.findOne({ email })
            if (user)
                return res.json({ msg: "Login" })
            user = new User({ name, email, password, profile })
            user.password = await bcrypt.hash(user.password, 8)
            await user.save();
            res.status(201).json({ msg: "User created" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email })
            if (!user)
                return res.json({ msg: "Register" })
            if(!await bcrypt.compare(password, user.password))
                return res.status(400).json({ msg: "Unauthorized access" })
            const token = await user.generateToken()
            res.cookie('token', token, { httpOnly: true }).json(token)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}