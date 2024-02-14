const express = require('express')
const router = express.Router()

const validateSchema = require('../../middlewares/validateSchema')
const { contactJoiSchema, favoriteJoiSchema } = require('../../models/contacts')

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/contacts/index')

router.get('/', wrapper(method.getAll))

router.get('/:id', wrapper(method.getById))

router.post('/', validateSchema(contactJoiSchema), wrapper(method.add))

router.delete('/:id', wrapper(method.remove))

router.put('/:id', validateSchema(contactJoiSchema), wrapper(method.update))

router.patch('/:id/favorite', validateSchema(favoriteJoiSchema), wrapper(method.update))

module.exports = router
