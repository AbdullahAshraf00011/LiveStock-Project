require('dotenv').config()

const express = require("express");
const app = express()

var cors = require("cors");
app.use(cors());


const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

// console.log(require('crypto').randomBytes(64).toString('hex'));

// var multer = require('multer');

db.on('error', (error) => console.error(error))
db.once('open', () =>console.log('Conected to db'))
app.use(express.json())

const userRouter = require('./routers/user-routes')
app.use('/api/users',userRouter)

const productRoutes = require('./routers/product-routes')
app.use('/api/products', productRoutes);

app.listen(5000, () => {
    console.log('server at port 5000')
})
