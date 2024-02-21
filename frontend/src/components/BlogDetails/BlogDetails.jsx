import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogWithChunks } from '../../utils/blogAPI';
import images from '../../constants/images';
import Footer from '../Footer/Footer';
import './BlogDetails.css';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const image = images['Dolor'];

  useEffect(() => {
    getBlogWithChunks(id).then(setBlog);
  }, [id]);

  useEffect(() => {
    // Save the scroll position when the component is rendered
    localStorage.setItem('scrollPosition', window.scrollY);
  }, []);

  if (!blog) return null;

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <>
      <div className="BlogDetails_Container">
        <div className="BlogDetails_textContainer">

          <div className="BlogDetails_textContainer_info">
            <div className="BlogDetails_textContainer_title">
              <h2>{blog.title}</h2>
            </div>
            <div className="BlogDetails_textContainer_author">
              <h2>Written by:</h2>
              <p>{blog.author}</p>
            </div>
            <div className="BlogDetails_textContainer_date">
              <h2>Posted on:</h2>
              <p>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="BlogDetails_textContainer_content">
              <h3>ARTICLE:</h3>
              {blog.contentChunks && blog.contentChunks.map((chunk, index) => (
                <div key={index} className="BlogDetails_textContainer_content_chunk">
                  {chunk.split(/\n+/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="BlogDetails_textContainer_buttonWrapper">
            <button className="BlogDetails_textContainer_button" onClick={goBack}>Back</button>
          </div>
        </div>
        <div className='BlogDetails_mediaContainer'>
          <img src={image} alt={blog.title} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogDetails;