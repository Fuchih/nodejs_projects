require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
app.use(express.static('./public'))
app.use(express.json())

const fileUpload = require('express-fileupload')
app.use(fileUpload({ useTempFiles: true }))

// cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// database
const connectDB = require('./db/connect')

//product router
const productRouter = require('./routes/productRoutes')
app.use('/api/v1/products', productRouter)

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
