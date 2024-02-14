const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const validateToken = require('./middlewares/validateToken')

app.use('/api/contacts', validateToken, contactsRouter)
app.use('/api/users', usersRouter)

app.use('/avatars', express.static('public/avatars'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

const errorResponses = {
  400: { status: 400 },
  401: { status: 401 },
  403: { status: 403 },
  404: { status: 404 },
  409: { status: 409 }
};

app.use((err, req, res, next) => {
  if (err instanceof Error && err.status && errorResponses[err.status]) {
    const { status } = errorResponses[err.status];
    res.status(status).json({ message: err.message })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = app
