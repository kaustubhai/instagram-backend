const Post = require('../models/Post')
const User = require('../models/User')
const sharp = require('sharp')

module.exports = {
    getAll: async (req, res) => {
        const post = await Post.find().populate('owner', 'name location profile')
        res.json(post)
    },
    post: async(req, res) => {
        const buffer = req.file.buffer;
        const image = sharp(buffer).resize(500, 500).webp().toBuffer()
        const { caption, location } = req.body;
        const post = new Post({ image, caption, location, owner: req.user });
        await post.save();
        const user = await User.findById(req.user)
        user.uploaded = [...user.uploaded, post._id]
        await user.save()
        res.status(201).json({ msg: "Post created" })
    },
    getById: async (req, res) => {
        const id = req.params.id
        const post = await Post.findById(id).populate('owner', 'name location profile')
        res.json(post)
    },
    like: async (req, res) => {
        const id = req.params.id
        const post = await Post.findById(id)
        if (!post)
            res.status(400).json({ msg: "No post founded" })
        post.likes = post.likes + 1
        await post.save()
        const user = await User.findById(req.user)
        user.liked = [...user.liked, id]
        res.json({ msg: "Post liked" })
        await user.save()
    }
}