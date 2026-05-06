import { createContext, useContext, useState, useEffect } from 'react';
import { users as initUsers } from '../mock/mockData';

const AuthContext = createContext(null);

const EMAIL_DOMAIN = '@sunutrainingcenter.sn';

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

  // Build the platform email: prenom.nom@sunutrainingcenter.sn
  const buildPlatformEmail = (prenom, nom, societe, role) => {
    if (role === 'entreprise') {
      const slug = (societe || 'entreprise')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 20);
      return slug + EMAIL_DOMAIN;
    }
    const p = (prenom || '').toLowerCase().replace(/[^a-z]/g, '');
    const n = (nom || '').toLowerCase().replace(/[^a-z]/g, '');
    return `${p}.${n}${EMAIL_DOMAIN}`;
  };

  const register = ({ nom, prenom, email, password, role, societe, telephone }) => {
    setRegisterError('');
    if (users.find(u => u.email === email)) {
      setRegisterError('Cet email est déjà utilisé.');
      return false;
    }

    const platformEmail = buildPlatformEmail(prenom, nom, societe, role);
    let finalPlatformEmail = platformEmail;
    let suffix = 1;
    while (users.find(u => u.platformEmail === finalPlatformEmail)) {
      const base = platformEmail.replace(EMAIL_DOMAIN, '');
      finalPlatformEmail = `${base}${suffix}${EMAIL_DOMAIN}`;
      suffix++;
    }

    // Use a small numeric ID for candidatId/entrepriseId so it can match data arrays
    const numericId = Date.now() % 1000000; // keep it manageable
    const newId = 'u' + Date.now();
    const displayName = role === 'entreprise' ? societe : (prenom + ' ' + nom);
    const newUser = {
      id: newId,
      email,
      platformEmail: finalPlatformEmail,
      password,
      role,
      nom: displayName,
      telephone: telephone || '',
      ...(role === 'candidat' ? { candidatId: numericId, prenom, nomFamille: nom } : {}),
      ...(role === 'entreprise' ? { entrepriseId: numericId, societe } : {}),
    };
    setUsers(prev => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return { user: safeUser, platformEmail: finalPlatformEmail, numericId };
  };

  const logout = () => { setUser(null); };

  return (
    <AuthContext.Provider value={{
      user, login, logout, register, loginError, setLoginError,
      registerError, setRegisterError, EMAIL_DOMAIN,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
