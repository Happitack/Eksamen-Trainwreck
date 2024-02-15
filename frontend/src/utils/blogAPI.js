export async function getBlog(id) {
  const response = await fetch(`http://localhost:4000/api/blog/${id}`)
    return response.json();
}

export async function getBlogs() {
  const response = await fetch('http://localhost:4000/api/blog');
  return response.json();
}

export async function createBlog(blog) {
  const response = await fetch('http://localhost:4000/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  return response.json();
}

export async function deleteBlog(blogId) {
  const response = await fetch(`http://localhost:4000/api/blog/${blogId}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function updateBlog(blog) {
  const { _id, ...blogDetails } = blog;
  const response = await fetch(`http://localhost:4000/api/blog/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogDetails),
  });
  return response.ok;
}
