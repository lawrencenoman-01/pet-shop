const express = require('express')
const authRoute = require('./authRoutes')
const userRoute = require('./userRoutes')
const categoryRoute = require('./categoryRoutes')
const productRoute = require('./productRoutes')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.use('/auth', authRoute)
router.use(authentication)
router.use('/user', userRoute)
router.use('/category', categoryRoute)
router.use('/product', productRoute)

module.exports = router