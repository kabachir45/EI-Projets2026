import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import logo from '../assets/logo.jpeg';
import styles from './Inscription.module.css';

export default function Inscription() {
  const { register, registerError, setRegisterError, EMAIL_DOMAIN } = useAuth();
  const { addCandidatFromRegistration, addEntrepriseFromRegistration } = useData();
  const navigate = useNavigate();
  const [role, setRole] = useState('candidat');
  const [form, setForm] = useState({ prenom: '', nom: '', societe: '', email: '', password: '', confirm: '', telephone: '', secteur: '' });
  const [localError, setLocalError] = useState('');
  const [createdEmail, setCreatedEmail] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(''); setRegisterError('');
    if (form.password !== form.confirm) { setLocalError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 6) { setLocalError('Le mot de passe doit faire au moins 6 caractères.'); return; }
    const result = register({ ...form, role });
    if (result) {
      // Create the profile entry in DataContext
      if (role === 'candidat') {
        addCandidatFromRegistration({
          id: result.numericId,
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone,
        });
      } else {
        addEntrepriseFromRegistration({
          id: result.numericId,
          societe: form.societe,
          secteur: form.secteur,
          email: form.email,
          telephone: form.telephone,
        });
      }
      setCreatedEmail(result.platformEmail);
      setTimeout(() => {
        if (role === 'candidat') navigate('/espace-candidat');
        else navigate('/espace-entreprise');
      }, 3000);
    }
  };

  if (createdEmail) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff', padding: '20px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,19,255,0.1)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#0013FF', marginBottom: 12 }}>Compte créé !</h2>
          <p style={{ color: '#555', marginBottom: 20 }}>Votre compte STC a été créé avec succès. Votre adresse email professionnelle sur la plateforme est :</p>
          <div style={{ background: '#f0f3ff', border: '2px solid #0013FF', borderRadius: 10, padding: '14px 20px', marginBottom: 20 }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: '#0013FF' }}>{createdEmail}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>Redirection vers votre espace dans quelques secondes…</p>
        </div>
      </div>
    );
  }

  // Compute preview email
  const previewEmail = () => {
    if (role === 'entreprise' && form.societe) {
      return form.societe.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20) + EMAIL_DOMAIN;
    }
    if (role === 'candidat' && (form.prenom || form.nom)) {
      const p = (form.prenom || '').toLowerCase().replace(/[^a-z]/g, '');
      const n = (form.nom || '').toLowerCase().replace(/[^a-z]/g, '');
      if (p || n) return `${p}.${n}${EMAIL_DOMAIN}`;
    }
    return null;
  };

  const emailPreview = previewEmail();

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
          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>
              📧 Tous les comptes créés reçoivent une adresse<br />
              <strong style={{ color: '#F5A623' }}>@sunutrainingcenter.sn</strong>
            </p>
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
              <label className="form-label">Email personnel (pour vous connecter)</label>
              <input className="form-input" type="email" placeholder="vous@email.com" value={form.email} onChange={e => set('email', e.target.value)} required autoComplete="email" />
            </div>

            {emailPreview && (
              <div style={{ background: '#f0f3ff', border: '1px solid #c7d0ff', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#0013FF' }}>
                📧 Votre email plateforme : <strong>{emailPreview}</strong>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input className="form-input" type="password" placeholder="6 caractères min." value={form.password} onChange={e => set('password', e.target.value)} required autoComplete="new-password" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmer</label>
                <input className="form-input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} required autoComplete="new-password" />
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
