const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const getAvatar = require('./getAvatar')
const verifyEmail = require('./verifyEmail')
const reVerification = require('./reVerification')

module.exports = {
    register,
    login,
    logout,
    current,
    updateSubscription,
    updateAvatar,
    getAvatar,
    verifyEmail,
    reVerification,
}