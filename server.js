const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()
const db = require('./utils/db')
db()
const cp = require('cookie-parser')

app.use(express.json({extended: false}))
app.use(cp())
app.use(cors())
app.use('/api', require('./router/index'))
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is live on ${PORT}`))