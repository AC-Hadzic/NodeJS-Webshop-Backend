import express from 'express'
import { getAllCategories, getCategoryById } from '../controllers/categoryController'

const router = express.Router()

// dohvacanje svih kategorija kao liste
router.get('/', getAllCategories)

// dohvacanje jedne kategorije pomocu id-a kao detalji
router.get('/:id', getCategoryById)

export default router
