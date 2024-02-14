const express = require('express')
const router = express.Router()

const validateToken = require('../../middlewares/validateToken')

const validateSchema = require('../../middlewares/validateSchema')
const { userJoiSchema } = require('../../models/users')

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/auth/index')

router.post('/signup', validateSchema(userJoiSchema), wrapper(method.register))

router.post('/signin', validateSchema(userJoiSchema), wrapper(method.login))

router.post('/signout', validateToken, wrapper(method.logout))

module.exports = router
