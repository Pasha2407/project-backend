const express = require('express')
const router = express.Router()

const validateToken = require('../../middlewares/validateToken')

const validateSchema = require('../../middlewares/validateSchema')
const { registerJoiSchema } = require('../../models/joiSchemas/auth')
const { loginJoiSchema } = require('../../models/joiSchemas/auth')

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/auth/index')

router.post('/signup', validateSchema(registerJoiSchema), wrapper(method.register))

router.post('/signin', validateSchema(loginJoiSchema), wrapper(method.login))

router.post('/signout', validateToken, wrapper(method.logout))

module.exports = router
