export async function getSubscriptions() {
  const response = await fetch('http://localhost:4000/api/newsletters');
  return response.json();
}

export async function subscribe(email) {
  const response = await fetch('http://localhost:4000/api/newsletters/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
}

export async function unsubscribe(email) {
  const response = await fetch('http://localhost:4000/api/newsletters/unsubscribe', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), // send the email as an object
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.ok;
}

export async function updateSubscription(email) {
  const { _id, ...emailDetails } = email;
  const response = await fetch(`http://localhost:4000/api/newsletters/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailDetails),
  });
  return response.ok;
}
