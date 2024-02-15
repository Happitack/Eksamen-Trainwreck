import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog } from '../../utils/blogAPI';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(id).then(setBlog);
  }, [id]);

  if (!blog) return null;

  return (
    <div>
      <img src={blog.imageName} alt={blog.title} />
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default BlogDetails;