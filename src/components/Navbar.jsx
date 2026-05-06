import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/candidats', label: 'Candidats' },
    { path: '/entreprises', label: 'Entreprises' },
  ];

  const getSpaceLink = () => {
    if (!user) return null;
    if (user.role === 'admin') return { path: '/admin', label: '⚙️ Dashboard Admin' };
    if (user.role === 'candidat') return { path: '/espace-candidat', label: '👤 Mon Espace' };
    if (user.role === 'entreprise') return { path: '/espace-entreprise', label: '🏢 Mon Espace' };
    return null;
  };

  const spaceLink = getSpaceLink();
  const close = (fn) => { fn(); setMenuOpen(false); };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* BRAND */}
        <div className={styles.brand} onClick={() => close(() => navigate('/'))}>
          <img src={logo} alt="STC" className={styles.logo} />
          <div className={styles.brandText}>
            <div className={styles.initials}>
              <span className={styles.initialsS}>S</span>
              <span className={styles.initialsT}>T</span>
              <span className={styles.initialsC}>C</span>
            </div>
            <span className={styles.brandSub}>Sunu Training Center</span>
          </div>
        </div>

        {/* Desktop nav links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(l => (
            <li key={l.path}>
              <button
                className={`${styles.link} ${isActive(l.path) ? styles.active : ''}`}
                onClick={() => close(() => navigate(l.path))}
              >
                {l.label}
              </button>
            </li>
          ))}

          {/* Mobile-only: user actions inside the dropdown */}
          {user ? (
            <>
              <li className={styles.mobileUserRow}>
                <span className={styles.mobileUserName}>👋 {user.nom}</span>
              </li>
              {spaceLink && (
                <li>
                  <button className={styles.mobileSpaceBtn} onClick={() => close(() => navigate(spaceLink.path))}>
                    {spaceLink.label}
                  </button>
                </li>
              )}
              <li>
                <div className={styles.mobileActions}>
                  <button className={styles.mobileLogoutBtn} onClick={handleLogout}>⏻ Se déconnecter</button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <div className={styles.mobileActions}>
                <button className={styles.mobileLoginBtn} onClick={() => close(() => navigate('/connexion'))}>Se connecter</button>
                <button className={styles.mobileRegisterBtn} onClick={() => close(() => navigate('/inscription'))}>Créer un compte</button>
              </div>
            </li>
          )}
        </ul>

        {/* Desktop actions */}
        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.userName}>{user.nom}</span>
              {spaceLink && (
                <button className={styles.spaceBtn} onClick={() => navigate(spaceLink.path)}>
                  {spaceLink.label}
                </button>
              )}
              <button className={styles.logoutBtn} onClick={handleLogout} title="Déconnexion">⏻</button>
            </>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={() => navigate('/connexion')}>Se connecter</button>
              <button className={styles.registerBtn} onClick={() => navigate('/inscription')}>S'inscrire</button>
            </>
          )}
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
