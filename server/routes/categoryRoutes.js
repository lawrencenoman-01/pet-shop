const express = require('express')
const router = express.Router()
const { getAll, getCategoryByName, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { authorization } = require('../middlewares/auth')

router.use(authorization(['admin']))
router.get('/', getAll)
router.get('/:id', getCategoryById)
router.get('/spesific/:name', getCategoryByName)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router