const request = require('supertest');
const express = require('express');
const blogRoutes = require('../../routes/blogRoutes');
const mongoose = require('mongoose');
const Blog = require('../../models/blogModel');
const app = express();

app.use(express.json());
app.use('/api/blog', blogRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
});

afterEach(async () => {
  await Blog.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Blog Controller', () => {
  it('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blog')
      .send({
        title: 'Test Blog',
        author: 'Test Author',
        summary: 'Test Summary',
        content: 'Test Content',
        imageName: 'test.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Blog');
  });

  it('should not create a blog with invalid data', async () => {
    const res = await request(app)
      .post('/api/blog')
      .send({
        title: '',
        author: '',
        summary: '',
        content: '',
        imageName: ''
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should get all blogs', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      summary: 'Test Summary',
      content: 'Test Content',
      imageName: 'test.jpg'
    });
    await blog.save();

    const res = await request(app).get('/api/blog');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
  });

  it('should get a blog by id', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      summary: 'Test Summary',
      content: 'Test Content',
      imageName: 'test.jpg'
    });
    await blog.save();

    const res = await request(app).get(`/api/blog/${blog._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(blog.title);
  });

  it('should update a blog by id', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      summary: 'Test Summary',
      content: 'Test Content',
      imageName: 'test.jpg'
    });
    await blog.save();

    const res = await request(app)
      .put(`/api/blog/${blog._id}`)
      .send({
        title: 'Updated Test Blog',
        author: 'Updated Test Author',
        summary: 'Updated Test Summary',
        content: 'Updated Test Content',
        imageName: 'updated_test.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Test Blog');
  });

  it('should delete a blog by id', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      summary: 'Test Summary',
      content: 'Test Content',
      imageName: 'test.jpg'
    });
    await blog.save();

    const res = await request(app).delete(`/api/blog/${blog._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(String(blog._id));
  });
});