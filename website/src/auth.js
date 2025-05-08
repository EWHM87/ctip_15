const fakeUsers = {
  'admin':   { password: 'adminpass',  role: 'admin' },
  'guide':   { password: 'guidepass',  role: 'guide' },
  'visitor': { password: 'visitorpass',role: 'visitor' }
};

const AuthService = {
  login(username, password) {
    const user = fakeUsers[username];
    if (user && user.password === password) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  },
  logout() {
    localStorage.clear();
  },
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  },
  getRole() {
    return localStorage.getItem('role');
  },
  getCurrentUser() {
    if (!this.isLoggedIn()) return null;
    return {
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role')
    };
  }
};

export default AuthService;