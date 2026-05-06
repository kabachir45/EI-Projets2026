import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={logo} alt="STC" />
            <span>SUNU <em>Training</em> Center</span>
          </div>
          <p>Cabinet de recrutement et d'intérim spécialisé en GRC à Dakar, Sénégal. Experts qualifiés disponibles sous 48h.</p>
          <p className={styles.contact}>📧 contact@sunutrainingcenter.sn &nbsp;|&nbsp; 📞 +221 33 XXX XX XX</p>
        </div>

        <div className={styles.col}>
          <h4>Services</h4>
          <ul>
            <li><button onClick={() => navigate('/entreprises')}>L'Intérim Expert</button></li>
            <li><button onClick={() => navigate('/entreprises')}>Management de Transition</button></li>
            <li><button onClick={() => navigate('/entreprises')}>Pré-embauche CDI</button></li>
            <li><button onClick={() => navigate('/abonnements')}>Nos abonnements</button></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Navigation</h4>
          <ul>
            <li><button onClick={() => navigate('/candidats')}>Espace Candidat</button></li>
            <li><button onClick={() => navigate('/entreprises')}>Espace Entreprise</button></li>
            <li><button onClick={() => navigate('/connexion')}>Se connecter</button></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Suivez-nous</h4>
          <div className={styles.socials}>
            {['in', 'f', 'ig', 'tt'].map(s => (
              <button key={s} className={styles.social}>{s}</button>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: 12 }}>
            Sacré-Cœur 3 VDN, Dakar
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 Sunu Training Center — SARL Dakar. Tous droits réservés.</p>
        <div className={styles.legal}>
          <button>Mentions légales</button>
          <button>Politique de confidentialité</button>
        </div>
      </div>
    </footer>
  );
}
