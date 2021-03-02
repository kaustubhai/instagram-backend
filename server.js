const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()
const db = require('./utils/db')
db("instagram")
const cp = require('cookie-parser')

app.use(express.json({extended: false}))
app.use(cp())
app.use('/api', require('./router/index'))
app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is live on ${PORT}`))