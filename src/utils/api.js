const api = {
  // Authentication
  login: (credentials) => post('/jwt-auth/v1/token', credentials),
  register: (userData) => post('/wp/v2/users/register', userData),
  validateToken: (token) => post('/jwt-auth/v1/token/validate', {}, { 'Authorization': `Bearer ${token}` }),

  // Cart
  getCart: (token) => get('/wc/v3/cart', { 'Authorization': `Bearer ${token}` }),
  addToCart: (token, item) => post('/wc/v3/cart/add', item, { 'Authorization': `Bearer ${token}` }),
  removeFromCart: (token, itemId) => post('/wc/v3/cart/remove', { item_id: itemId }, { 'Authorization': `Bearer ${token}` }),
  clearCart: (token) => post('/wc/v3/cart/clear', {}, { 'Authorization': `Bearer ${token}` }),

  // Checkout
  checkout: (token, data) => post('/wc/v3/checkout', data, { 'Authorization': `Bearer ${token}` }),

  // Orders are fetched via a secure server-side endpoint
  getOrders: (token) => get('/my-custom-api/v1/orders', { 'Authorization': `Bearer ${token}` }),
};

export default api;

async function get(endpoint, headers = {}) {
  return request('GET', endpoint, null, headers);
}

async function post(endpoint, body, headers = {}) {
  return request('POST', endpoint, body, headers);
}

async function request(method, endpoint, body, headers = {}) {
  const url = `${process.env.REACT_APP_API_URL}/wp-json${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Network error or server is not responding.');
  }
}
