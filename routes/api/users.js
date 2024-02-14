const express = require('express')
const router = express.Router()

const validateToken = require('../../middlewares/validateToken')
const uploadAvatar = require('../../middlewares/uploadAvatar')
const jimpEdit = require('../../middlewares/jimpEdit')

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/users/index')

router.get('/current', validateToken, wrapper(method.current))

router.patch('/update', validateToken, wrapper(method.updateUser))

router.post('/subscribe', validateToken, wrapper(method.sendSubscribe))

router.patch('/avatar', validateToken, uploadAvatar.single('avatar'), jimpEdit, wrapper(method.updateAvatar))

module.exports = router
