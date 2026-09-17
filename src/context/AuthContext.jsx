import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  user: undefined,
  isUserLoggedIn: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isUserLoggedIn = !!user;

  const login = (role) => {
    const name = `${role[0].toUpperCase() + role.slice(1)} User`;
    setUser({ name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isUserLoggedIn, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
