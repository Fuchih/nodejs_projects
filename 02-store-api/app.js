require('dotenv').config()
require('express-async-errors')
const express = require('express')
const productsRouter = require('./routes/products')
const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>store API</h1><a href="/api/v1/products">Product route</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PROT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
