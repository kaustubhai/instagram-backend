const Post = require('../models/Post')
const User = require('../models/User')
const sharp = require('sharp')

module.exports = {
    getAll: async (req, res) => {
        try {
            const post = await Post.find().populate('owner', 'name location profile')
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    post: async(req, res) => {
        try {
            const buffer = req.file.buffer;
            const image = await sharp(buffer).resize(500, 500).webp().toBuffer()
            const { caption, location } = req.body;
            const post = new Post({ image, caption, location, owner: req.user });
            await post.save();
            const user = await User.findById(req.user)
            user.uploaded = [...user.uploaded, post._id]
            await user.save()
            res.status(201).json({ msg: "Post created" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id
            const post = await Post.findById(id).populate('owner', 'name location profile')
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
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
        try {
            const id = req.params.id
            const post = await Post.findById(id).populate('owner', 'name profile')
            if (!post)
                res.status(400).json({ msg: "No post founded" })
            post.likes = post.likes + 1
            await post.save()
            const user = await User.findById(req.user)
            if (user.liked.indexOf(id) === -1) {                
                user.liked = [...user.liked, id]
                await user.save()
            }
            res.json({ msg: "Post liked" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },
}