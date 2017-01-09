function api(state, action) {
  if (!state) {
    return {
      url: 'http://localhost:8000/api'
    };
  }

  return state;
}

export default api;
