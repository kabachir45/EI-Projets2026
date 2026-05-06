import { createContext, useContext, useState, useEffect } from 'react';
import { users as initUsers } from '../mock/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('stc_users');
      return saved ? JSON.parse(saved) : initUsers;
    } catch { return initUsers; }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('stc_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    if (user) localStorage.setItem('stc_user', JSON.stringify(user));
    else localStorage.removeItem('stc_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('stc_users', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    setLoginError('');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) { setLoginError('Email ou mot de passe incorrect.'); return false; }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return true;
  };

  const register = ({ nom, prenom, email, password, role, societe }) => {
    setRegisterError('');
    if (users.find(u => u.email === email)) {
      setRegisterError('Cet email est deja utilise.');
      return false;
    }
    const newId = 'u' + Date.now();
    const newUser = {
      id: newId, email, password, role,
      nom: role === 'entreprise' ? societe : (prenom + ' ' + nom),
      ...(role === 'candidat' ? { candidatId: Date.now() } : {}),
      ...(role === 'entreprise' ? { entrepriseId: Date.now() } : {}),
    };
    setUsers(prev => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return true;
  };

  const logout = () => { setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginError, setLoginError, registerError, setRegisterError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
