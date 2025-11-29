
const BASE_URL = "https://cs571api.cs.wisc.edu/rest/f25/bucket";


const HEADERS = {
  "Content-Type": "application/json",
  "X-CS571-ID": "bid_2c7b5db6c4ecdb345cda04a3981f020bc33a526a5ced084432054b9cbbbd90cc"
};



// Register user
export async function registerUser(username, password, role) {
  const res = await fetch(`${BASE_URL}/accounts`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ username, password, role }),
  });


  return res.ok;
}


// Login and get JWT
export async function loginRequest(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/accounts`, { headers: HEADERS });
    if (!res.ok) return null;


    const data = await res.json();
    const accounts = data.results;


    // Search for the matching account
    for (let id in accounts) {
      if (accounts[id].username === username && accounts[id].password === password) {
        // Return a simple "token" object with username + role
        return { username: accounts[id].username, role: accounts[id].role };
      }
    }


    return null; 
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
}

// GET all foods

export async function getFoods() {
  const res = await fetch(`${BASE_URL}/foods`, { headers: HEADERS });
  const data = await res.json();
  return Object.entries(data.results).map(([uuid, food]) => ({
    ...food,
    uuid
  }));
}

// POST new food (Admin only)
export async function addFood(food,token) {
  const res = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    headers: { ...HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify(food),
  });
  return res.ok;
}


// PUT update food (Admin only )
export async function updateFood(uuid, food, token) {
  const res = await fetch(`${BASE_URL}/foods?id=${uuid}`, {
    method: "PUT",
     headers: { ...HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify(food),
  });
  return res.ok;
}


// DELETE food (Admin only)
export async function deleteFood(uuid,token) {
  const res = await fetch(`${BASE_URL}/foods?id=${uuid}`, {
    method: "DELETE",
    headers: { ...HEADERS, Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

// ORDER REQUESTS, GET all orders by users
export async function getOrders(token) {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results;
}

// POST new order
export async function submitOrder(order, token) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(order),
  });
  return res.ok;
}
