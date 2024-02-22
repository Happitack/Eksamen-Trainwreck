import React, { useState, useEffect } from 'react';
import { getBlog, getBlogs, deleteBlog, updateBlog, createBlog } from '../../../utils/blogAPI'; 
import './BlogAdmin.css';

function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', summary: '', content: '', imageName: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const blogs = await getBlogs();
    setBlogs(blogs);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    await createBlog(form); // use createBlog here
    fetchBlogs();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await updateBlog(editingBlog);
    if (response) {
      setForm({ title: '', author: '', summary: '', content: '', imageName: '' });
      fetchBlogs();
      setEditingBlog(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setForm(blog);
  };

  const handleChange = (event) => {
    const updatedForm = { ...form, [event.target.name]: event.target.value };
    setForm(updatedForm);
    if (editingBlog) {
      setEditingBlog(updatedForm);
    }
  };

  return (
    <div className="container">
      <form onSubmit={editingBlog ? handleUpdate : handleCreate} className="form">
        <h2>{editingBlog ? 'Edit Blog' : 'Create Blog'}</h2>
        <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input className="input" name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
        <textarea className="input" name="summary" value={form.summary} onChange={handleChange} placeholder="Summary" required />
        <textarea className="input" name="content" value={form.content} onChange={handleChange} placeholder="Content" required />
        <input className="input" name="imageName" value={form.imageName} onChange={handleChange} placeholder="Image Name" required />
        <button className="button" type="submit">{editingBlog ? 'Update' : 'Create'}</button>
      </form>
      <div className="blogsContainer">
        <h2>Blog:</h2>
        {blogs.map((blog) => (
          <div key={blog._id} className="blogCard">
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p>{blog.summary}</p>
            <p>{blog.content}</p>
            <p>{blog.imageName}</p>
            <button className="button" onClick={() => handleEdit(blog)}>Edit</button>
            <button className="button" onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogAdmin;