export async function authenticateUser(username, password) {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log('Response status:', response.status);
    return response.ok;
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}