const AuthService = {
  login(username, role) {
    const user = { username, role };
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
  }
};

export default AuthService;
