const express = require('express')
const router = express.Router()
const { getAll, getProductById, createProduct, updateProduct, deleteProduct, midtrans } = require('../controllers/productController')
const { authorization } = require('../middlewares/auth')
const upload = require('../helpers/multer')

router.get('/', getAll)
router.get('/:id', getProductById)
router.post('/midtrans', midtrans)
router.use(authorization(['admin']))
router.post('/', upload.single('image'), createProduct)
router.put('/:id', upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router