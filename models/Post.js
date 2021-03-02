const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    }
}, {
    timeStamps: true
})

const post = mongoose.model('Post', postSchema)
module.exports = post