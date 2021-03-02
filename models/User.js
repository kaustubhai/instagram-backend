const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true,
        default: "https://img.icons8.com/metro/26/000000/user-male.png"
    },
    uploaded: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }],
    liked: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign(
      { user: user._id.toString() },
        process.env.SECURITY_KEY, {
            expiresIn: 36000
    })
  
    return token
}

const user = mongoose.model('User', userSchema)
module.exports = user