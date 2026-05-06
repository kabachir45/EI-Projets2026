import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Entreprises.module.css';

export default function Entreprises() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Espace Entreprises</span>
          <h1>Trouvez le bon profil GRC en <em>48h</em></h1>
          <p>Experts qualifiés, testés, disponibles immédiatement. Remplacement garanti sans frais si un profil ne convient pas.</p>
          <button className="btn btn-accent btn-xl" onClick={() => navigate('/connexion')} style={{ marginTop: 24 }}>
            Créer mon espace entreprise →
          </button>
        </div>
      </section>

      <section style={{ padding: '72px 5%', background: '#fff' }}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Notre processus en 4 étapes</h2>
          <p className="section-sub" style={{ marginBottom: 36 }}>De votre inscription à la mission démarrée, tout est géré par STC.</p>
          <div className={styles.processGrid}>
            {[
              ['01', "Créez votre compte", "Inscription rapide. Notre équipe valide votre compte sous 24h."],
              ['02', "Soumettez votre besoin", "Décrivez le poste, le profil recherché et vos contraintes via votre espace."],
              ['03', "Recevez des profils qualifiés", "Sous 48h, nos recruteurs vous proposent des candidats testés et vérifiés."],
              ['04', "Mission démarrée", "STC gère tous les aspects administratifs, RH et sociaux à votre place."],
            ].map(([n, t, d]) => (
              <div key={n} className={styles.processStep}>
                <div className={styles.processNum}>{n}</div>
                <h4 className={styles.processTitle}>{t}</h4>
                <p className={styles.processDesc}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 5%', background: 'var(--bg)' }}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 12 }}>Nos engagements</h2>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {[
              ['⚡', '48h', 'Réactivité garantie', 'Profils qualifiés présentés sous 48h — 24h en plan Premium.'],
              ['✅', '100%', 'Candidats testés', 'Orthographe, élocution, CRM, références vérifiées systématiquement.'],
              ['🔄', 'Gratuit', 'Remplacement garanti', 'Si un profil ne convient pas dans les 30 jours, remplacement sans frais.'],
            ].map(([i, v, t, d]) => (
              <div key={t} className={`card card-hover ${styles.engCard}`}>
                <div className={styles.engIcon}>{i}</div>
                <div className={styles.engVal}>{v}</div>
                <h4 className={styles.engTitle}>{t}</h4>
                <p className={styles.engDesc}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 5%', background: '#fff' }}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 32 }}>Abonnements disponibles</h2>
          <div className="grid-3">
            {[
              { nom: 'Starter', prix: '150 000 FCFA/mois', desc: '1-2 besoins/mois · Réponse 72h', color: '#27AE60' },
              { nom: 'Pro', prix: '350 000 FCFA/mois', desc: 'Jusqu\'à 10 besoins/mois · Réponse 48h ⚡', color: 'var(--primary)', featured: true },
              { nom: 'Premium', prix: '650 000 FCFA/mois', desc: 'Illimité · Réponse 24h ⚡⚡ · Account manager', color: '#F5A623' },
            ].map(p => (
              <div key={p.nom} className={`card ${styles.miniPlan} ${p.featured ? styles.miniPlanFeatured : ''}`}>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, color: p.color, fontSize: '1.2rem', marginBottom: 4 }}>{p.nom}</h3>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{p.prix}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.83rem' }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-primary" onClick={() => navigate('/abonnements')}>Voir tous les détails →</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 5%', background: 'var(--primary)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: 12 }}>
          Prêt à recruter des experts GRC ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
          Créez votre compte entreprise et recevez vos premiers profils sous 48h.
        </p>
        <button className="btn btn-accent btn-xl" onClick={() => navigate('/connexion')}>
          Commencer maintenant →
        </button>
      </section>
    </div>
  );
}
