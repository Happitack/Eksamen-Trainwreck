const { body, validationResult } = require('express-validator');
const Blog = require('../models/blogModel');

// Validation rules
exports.validateBlog = [
  body('title', 'Blog title is required').trim().isLength({ min: 1, max: 100 }).withMessage('Blog title cannot be more than 100 characters'),
  body('author', 'Author is required').trim().isLength({ min: 1, max: 100 }).withMessage('Author name cannot be more than 100 characters'),
  body('summary', 'Blog summary is required').trim().isLength({ min: 1, max: 500 }).withMessage('Blog summary cannot be more than 500 characters'),
  body('content', 'Content is required').trim().isLength({ min: 1, max: 5000 }).withMessage('Blog content cannot be more than 5000 characters'),
  body('imageName', 'Image name is required').trim().isLength({ min: 1, max: 100 })
]

// desc: Get all blogs
// route: GET /api/blog
exports.getBlogs = async (req, res) => {
  const blog = await Blog.find();
  res.json(blog);
};

// desc: Get blog by id
// route: GET /api/blog/:id
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ msg: 'Blog not found' });
  }
  res.json(blog);
};

// desc: Add new blog
// route: POST /api/blog
exports.createBlog = [
  ...exports.validateBlog,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const blog = await Blog.create({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        content: req.body.content,
        imageName: req.body.imageName,
      });
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: 'Could not create blog' });
    }
  }
];

// desc: Update blog by ID
// route: PUT /api/blog/:id
exports.updateBlogById = [
  ...exports.validateBlog,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: 'Could not update blog' });
    }
  }
];

exports.deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete blog' });
  }
};