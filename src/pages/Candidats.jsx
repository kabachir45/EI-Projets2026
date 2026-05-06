import { useNavigate } from 'react-router-dom';
import styles from './Candidats.module.css';

const FAQ = [
  ['Comment fonctionne la sélection ?', 'Nous évaluons chaque candidat via des tests techniques (orthographe, élocution, maîtrise CRM). Les profils validés sont présentés aux entreprises clientes.'],
  ['Suis-je payé pendant une mission intérim ?', 'Oui, vous êtes salarié de Sunu Training Center. Nous gérons votre contrat, votre paie et vos cotisations sociales.'],
  ['Combien de temps avant d\'être contacté ?', 'Notre équipe analyse votre dossier sous 48h. Si votre profil correspond à une opportunité, nous vous appelons rapidement.'],
  ['Puis-je postuler si je suis déjà en poste ?', 'Absolument. Indiquez "En poste, ouvert aux opportunités" dans votre disponibilité lors de l\'inscription.'],
  ['Que sont les formations proposées ?', 'En fonction de votre profil et des missions, nos recruteurs peuvent vous proposer des formations courtes (2-4 jours) pour booster vos compétences GRC. Vous pouvez accepter ou refuser depuis votre espace.'],
];

export default function Candidats() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Espace Candidats</span>
          <h1>Trouvez votre prochain poste en <em>GRC</em></h1>
          <p>Intérim, CDI, Management de transition — les meilleures opportunités à Dakar et en Afrique de l'Ouest.</p>
          <button className="btn btn-accent btn-xl" onClick={() => navigate('/connexion')} style={{ marginTop: 24 }}>
            Créer mon espace candidat →
          </button>
        </div>
      </section>

      <section className={styles.etapesSection}>
        <div className={styles.sectionWrap}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-tag" style={{ display: 'flex', justifyContent: 'center' }}>Comment ça marche</span>
            <h2 className="section-title">3 étapes pour décrocher votre mission</h2>
          </div>
          <div className={styles.etapesGrid}>
            {[
              { n: '01', t: 'Créez votre profil', d: 'Remplissez votre parcours en 3 étapes guidées : infos personnelles, profil pro, tests et documents.' },
              { n: '02', t: 'Passez les tests', d: 'Tests d\'orthographe, d\'élocution, de maîtrise Office et CRM. Résultats utilisés par nos recruteurs.' },
              { n: '03', t: 'Soyez mis en relation', d: 'L\'équipe STC soumet votre profil aux entreprises clientes. Vous êtes notifié de chaque avancement.' },
            ].map(e => (
              <div key={e.n} className={styles.etapeCard}>
                <div className={styles.etapeNum}>{e.n}</div>
                <h3 className={styles.etapeTitle}>{e.t}</h3>
                <p className={styles.etapeDesc}>{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.avantagesSection}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Pourquoi rejoindre STC ?</h2>
          <div className="grid-2">
            {[
              ['⚡', 'Mise en relation rapide', 'Notre réseau d\'entreprises clientes vous donne accès à des opportunités exclusives non publiées.'],
              ['🎓', 'Formations incluses', 'Selon votre profil, recevez des propositions de formations courtes pour booster vos compétences.'],
              ['📋', 'Gestion admin simplifiée', 'STC gère votre contrat, votre paie et toutes les démarches administratives à votre place.'],
              ['🌍', 'Visibilité régionale', 'Accédez aux meilleures entreprises GRC au Sénégal et bientôt dans toute l\'Afrique de l\'Ouest.'],
            ].map(([i, t, d]) => (
              <div key={t} className={`card ${styles.avantCard}`}>
                <span className={styles.avantIcon}>{i}</span>
                <div>
                  <h4 className={styles.avantTitle}>{t}</h4>
                  <p className={styles.avantDesc}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Questions fréquentes</h2>
          {FAQ.map(([q, r], i) => (
            <div key={i} className={styles.faqItem}>
              <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {q} <span>{openFaq === i ? '▲' : '▼'}</span>
              </button>
              {openFaq === i && <div className={styles.faqA}>{r}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: 12 }}>
            Prêt à rejoindre le réseau STC ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28 }}>
            Créez votre profil gratuitement et soyez mis en relation sous 48h.
          </p>
          <button className="btn btn-accent btn-xl" onClick={() => navigate('/connexion')}>
            Créer mon profil →
          </button>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
