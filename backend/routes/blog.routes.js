import express from 'express'
const router = express.Router()

import { createBlog, getAllBlogs, getBlogById, deleteBlog } from '../controllers/blog/blog.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'


router.delete('/:id', authMiddleware, deleteBlog)

// Create blog → protected route
router.post('/', authMiddleware, createBlog)

// Get all blogs → public
router.get('/', getAllBlogs)

// Get single blog by ID → public
router.get('/:id', getBlogById)

export default router