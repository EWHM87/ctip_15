const AuthService = {
  // Store full user info on login, including ID
  login(id, username, role) {
    const user = { id, username, role };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('user');
  },

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  getRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
  },

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || null;
  },
};

export default AuthService;
