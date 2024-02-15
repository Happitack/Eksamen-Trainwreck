const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Routes for handling data requests
router.route('/')
    .get(blogController.getBlogs)
    .post(blogController.createBlog);

// Routes for handling data requests by ID
router.route('/:id')
    .get(blogController.getBlog)
    .put(blogController.updateBlogById)
    .delete(blogController.deleteBlogById);

module.exports = router;