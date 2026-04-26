import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Mock valid credentials
const VALID_USERS = [
  { username: 'allison', password: 'blog123', displayName: 'Allison Macari' },
  { username: 'admin', password: 'admin123', displayName: 'Admin User' },
  { username: 'demo', password: 'demo123', displayName: 'Demo Reader' },
];

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('blogUser');
    return stored ? JSON.parse(stored) : null;
  });

  function login(username, password) {
    const match = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (match) {
      const userData = { username: match.username, displayName: match.displayName };
      setUser(userData);
      sessionStorage.setItem('blogUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem('blogUser');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
