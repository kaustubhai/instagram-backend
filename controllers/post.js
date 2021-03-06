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
        const image = await sharp(buffer).resize(500, 500).webp().toBuffer()
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
    getLiked: async (req, res) => {
        try {
            const user = await User.findById(req.user)
            const posts = await Post.find({}).populate('owner', 'name profile')
            p = posts.filter(post => user.liked.indexOf(post._id) !== -1)
            res.json(p)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    like: async (req, res) => {
        const id = req.params.id
        const post = await Post.findById(id).populate('owner', 'name profile')
        if (!post)
            res.status(400).json({ msg: "No post founded" })
        post.likes = post.likes + 1
        await post.save()
        const user = await User.findById(req.user)
        user.liked = [...user.liked, id]
        res.json({ msg: "Post liked" })
        await user.save()
    },
}