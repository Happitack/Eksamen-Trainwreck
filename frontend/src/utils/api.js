// The authenticateUser function sends a POST request to the server with the username and password in the request body.
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
      // If the server responds with a 200 OK status, the function saves the JWT token in the local storage and returns the token.
      const { token } = await response.json();
      return token;
    } else {
      console.log('Login failed:', response.status);
      return null;
    }
  } catch (error) {
    // If the server does not respond, the function returns null.
    console.error('Network error:', error);
    return null;
  }
}

// The fetchProtectedData function sends a GET request to the server with the JWT token in the Authorization header.
export async function fetchProtectedData() {
  const token = localStorage.getItem('token');
  
  try {
    // attempts to fetch the protected data from the server
    const response = await fetch('http://localhost:4000/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      // If the server responds with a 200 OK status, the function returns the protected data.
      const data = await response.json();
      return data;
    } else {
      // If the server responds with an error status, the function logs the error and returns null.
      console.log('Request failed:', response.status);
      return null;
    }
  } catch (error) {
    // If the server does not respond, the function returns null.
    console.error('Network error:', error);
    return null;
  }
}