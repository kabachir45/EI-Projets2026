import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import styles from './Connexion.module.css';

export default function Connexion() {
  const { login, loginError, setLoginError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const doRedirect = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'candidat') navigate('/espace-candidat');
    else navigate('/espace-entreprise');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const ok = login(email, password);
    if (ok) {
      const stored = JSON.parse(localStorage.getItem('stc_user') || '{}');
      doRedirect(stored.role);
    }
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
              <label className="form-label">Adresse email</label>
              <input className="form-input" type="email" placeholder="votre@email.com"
                value={email} onChange={e => { setLoginError(''); setEmail(e.target.value); }} required autoComplete="email" />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label">Mot de passe</label>
              <input className="form-input" type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                value={password} onChange={e => { setLoginError(''); setPassword(e.target.value); }} required autoComplete="current-password"
                style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPwd(s => !s)}
                style={{ position: 'absolute', right: 12, top: 34, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--muted)' }}>
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <button type="submit" className={styles.submitBtn}>Se connecter →</button>
          </form>

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
