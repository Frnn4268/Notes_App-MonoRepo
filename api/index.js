const express = require('express')
const cors = require('cors')

require('dotenv').config()
require('./mongo.js')

const app = express()

// Middlewares
const notFound = require('./middlewares/notFound.js')
const handleError = require('./middlewares/handleError.js')
const logger = require('./middlewares/loggerMiddleware')

// Routers
const usersRouter = require('./controllers/users.js')
const notesRouter = require('./controllers/notes.js')
const homeRouter = require('./controllers/home.js')
const loginRouter = require('./controllers/login.js')

app.use(express.json())
app.use(logger)
app.use(cors())
app.use(express.static('../app/build'))

// app.use to use the Routers
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRouter)
app.use('/', homeRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing.js')

  app.use('/api/testing', testingRouter)
}

app.use(notFound) // Middleware notFound.js
app.use(handleError) // Middleware handleError.js

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
