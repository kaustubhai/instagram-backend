const express = require('express');
const Router = express.Router();
const user = require('../controllers/user')
const post = require('../controllers/post')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

Router.post('/user/register', user.register)
Router.post('/user/login', user.login)

Router.get('/all', post.getAll)
Router.post('/post', auth, upload.single('post'), post.post)
Router.get('/:id', auth, post.getById)
Router.get('/like/:id', auth, post.like)

module.exports = Router