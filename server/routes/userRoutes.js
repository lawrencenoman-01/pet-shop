const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/userController')
const { authorization } = require('../middlewares/auth')

router.use(authorization(['admin']))
router.get('/', getUser)

module.exports = router