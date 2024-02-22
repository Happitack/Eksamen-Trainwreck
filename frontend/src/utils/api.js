export async function authenticateUser(username, password) {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      return token;
    } else {
      console.log('Login failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}

export async function fetchProtectedData() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:4000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Request failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}