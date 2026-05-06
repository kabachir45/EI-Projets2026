import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import styles from './Connexion.module.css';

const QUICK_LOGINS = [
  { label: 'Candidat — Fatou', email: 'fatou@stc.sn', password: '1234', role: 'candidat', icon: '👤' },
  { label: 'Entreprise — Orange', email: 'orange@stc.sn', password: '1234', role: 'entreprise', icon: '🏢' },
  { label: 'Administrateur', email: 'admin@stc.sn', password: 'admin', role: 'admin', icon: '⚙️' },
];

export default function Connexion() {
  const { login, loginError, setLoginError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRedirect = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'candidat') navigate('/espace-candidat');
    else navigate('/espace-entreprise');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      const stored = JSON.parse(localStorage.getItem('stc_user') || '{}');
      doRedirect(stored.role);
    }
  };

  const quickRedirect = (q) => {
    setLoginError('');
    const ok = login(q.email, q.password);
    if (ok) doRedirect(q.role);
  };

  return (
    <div className={styles.page}>
      {/* Panneau gauche — branding */}
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <img src={logo} alt="STC" className={styles.leftLogo} />
          <div className={styles.leftInitials}>
            <span>S</span><span className={styles.orange}>T</span><span>C</span>
          </div>
          <h2 className={styles.leftTitle}>Sunu Training Center</h2>
          <p className={styles.leftSub}>Le 1er cabinet spécialisé GRC à Dakar. Experts qualifiés sous 48h.</p>
          <div className={styles.leftBadges}>
            <div className={styles.leftBadge}>⚡ Réponse 48h</div>
            <div className={styles.leftBadge}>✅ Tests certifiés</div>
            <div className={styles.leftBadge}>🔄 Remplacement garanti</div>
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1 className={styles.formTitle}>Connexion</h1>
          <p className={styles.formSub}>Accédez à votre espace STC</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="votre@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <button type="submit" className={styles.submitBtn}>Se connecter →</button>
          </form>

          <div className={styles.orRow}><span>ou accès rapide démo</span></div>

          <div className={styles.quickList}>
            {QUICK_LOGINS.map(q => (
              <button key={q.email} className={styles.quickBtn} onClick={() => quickRedirect(q)}>
                <span className={styles.quickIcon}>{q.icon}</span>
                <span className={styles.quickLabel}>{q.label}</span>
                <span className={styles.quickArrow}>→</span>
              </button>
            ))}
          </div>

          <div className={styles.registerRow}>
            Pas encore de compte ?
            <button onClick={() => navigate('/inscription')} className={styles.registerLink}>
              Créer un compte →
            </button>
          </div>

          <button className={styles.backBtn} onClick={() => navigate('/')}>← Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}
