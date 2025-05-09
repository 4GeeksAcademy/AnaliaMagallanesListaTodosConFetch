const API_BASE = "https://example.com"; // reemplaza con tu URL real

export const createUser = (username) => {
  return fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });
};

export const getTodos = (username) => {
  return fetch(`${API_BASE}/todos/${username}`).then(res => res.json());
};

export const addTodo = (username, taskText) => {
  return fetch(`${API_BASE}/todos/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: taskText, done: false })
  });
};

export const deleteTodo = (username, taskId) => {
  return fetch(`${API_BASE}/todos/${username}/${taskId}`, {
    method: "DELETE"
  });
};

export const clearTodos = (username) => {
  return fetch(`${API_BASE}/todos/${username}`, {
    method: "DELETE"
  });
};
