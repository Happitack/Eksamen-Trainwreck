import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs } from '../../utils/blogAPI';
import './Blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  return (
    <div className='Blog-comp'>
      <div className='Blog-header'>
        <h1>NEWS FROM THE STUDIO</h1>
      </div>
      <div className='Blog-content '>
        {blogs.map((blog) => {
          const date = new Date(blog.createdAt);
          const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
          const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  
          return (
            <div className='Blog-item' key={blog._id}>
              <h1>{blog.title}</h1>
              <div className="datetime">
                <p>{`${monthDay}, ${year}`}</p>
              </div>
              <h2>By {blog.author}</h2>
              <img src={blog.imageName} alt={blog.title} />
              <p>{blog.summary}</p>
              <button onClick={() => navigate(`/blog/${blog._id}`)}>Read More</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;