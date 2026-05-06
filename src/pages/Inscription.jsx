import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import styles from './Inscription.module.css';

export default function Inscription() {
  const { register, registerError, setRegisterError } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('candidat');
  const [form, setForm] = useState({ prenom: '', nom: '', societe: '', email: '', password: '', confirm: '', telephone: '', secteur: '' });
  const [localError, setLocalError] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(''); setRegisterError('');
    if (form.password !== form.confirm) { setLocalError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 6) { setLocalError('Le mot de passe doit faire au moins 6 caractères.'); return; }
    const ok = register({ ...form, role });
    if (ok) {
      if (role === 'candidat') navigate('/espace-candidat');
      else navigate('/espace-entreprise');
    }
  };

  return (
    <div className={styles.page}>
      {/* Panneau gauche */}
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <img src={logo} alt="STC" className={styles.leftLogo} />
          <div className={styles.leftInitials}>
            <span>S</span><span className={styles.orange}>T</span><span>C</span>
          </div>
          <h2 className={styles.leftTitle}>Rejoignez le réseau STC</h2>
          <p className={styles.leftSub}>Créez votre compte et accédez aux meilleures opportunités GRC à Dakar.</p>
          <div className={styles.steps}>
            {['Créer votre compte', 'Compléter votre profil', 'Être mis en relation'].map((s, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1 className={styles.formTitle}>Créer un compte</h1>
          <p className={styles.formSub}>Remplissez vos informations pour commencer</p>

          {/* Choix du type de compte */}
          <div className={styles.roleToggle}>
            <button className={`${styles.roleBtn} ${role === 'candidat' ? styles.roleActive : ''}`} onClick={() => setRole('candidat')}>
              👤 Je suis candidat
            </button>
            <button className={`${styles.roleBtn} ${role === 'entreprise' ? styles.roleActive : ''}`} onClick={() => setRole('entreprise')}>
              🏢 Je représente une entreprise
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {role === 'candidat' ? (
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input className="form-input" placeholder="Fatou" value={form.prenom} onChange={e => set('prenom', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input className="form-input" placeholder="Diallo" value={form.nom} onChange={e => set('nom', e.target.value)} required />
                </div>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Raison sociale</label>
                  <input className="form-input" placeholder="Orange Sénégal" value={form.societe} onChange={e => set('societe', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Secteur d'activité</label>
                  <select className="form-select" value={form.secteur} onChange={e => set('secteur', e.target.value)} required>
                    <option value="">Sélectionner…</option>
                    {["BPO/Centre d'appels", 'Télécoms', 'Banque', 'Assurance', 'Fintech', 'Commerce', 'Autre'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input className="form-input" placeholder="+221 77 000 00 00" value={form.telephone} onChange={e => set('telephone', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Email professionnel</label>
              <input className="form-input" type="email" placeholder="vous@email.com" value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input className="form-input" type="password" placeholder="6 caractères min." value={form.password} onChange={e => set('password', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmer</label>
                <input className="form-input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} required />
              </div>
            </div>

            {(localError || registerError) && (
              <div className="alert alert-danger">{localError || registerError}</div>
            )}

            <div className={styles.cgvRow}>
              <input type="checkbox" id="cgv" required />
              <label htmlFor="cgv">J'accepte les <button type="button" className={styles.link}>conditions d'utilisation</button></label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Créer mon compte →
            </button>
          </form>

          <div className={styles.loginRow}>
            Déjà un compte ?
            <button onClick={() => navigate('/connexion')} className={styles.loginLink}>Se connecter</button>
          </div>

          <button className={styles.backBtn} onClick={() => navigate('/')}>← Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}
