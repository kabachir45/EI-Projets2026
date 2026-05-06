import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import logoISM from '../assets/logo-ism.png';
import logoConcentrix from '../assets/logo-concentrix.png';
import logoWave from '../assets/logo-wave.png';
import logoIntelcia from '../assets/logo-intelcia.png';
import logoBICIS from '../assets/logo-bicis.png';
import logoOrange from '../assets/logo-orange.jpg';
import styles from './Accueil.module.css';

const PARTENAIRES = [
  { nom: 'Orange Sénégal', logo: logoOrange, secteur: 'Télécoms', bg: '#fff' },
  { nom: 'Concentrix', logo: logoConcentrix, secteur: 'BPO', bg: '#fff' },
  { nom: 'Wave', logo: logoWave, secteur: 'Fintech', bg: '#00C3A0' },
  { nom: 'Intelcia', logo: logoIntelcia, secteur: 'Call Center', bg: '#5B2D8E' },
  { nom: 'ISM', logo: logoISM, secteur: 'Formation', bg: '#3D1A00' },
  { nom: 'BICIS', logo: logoBICIS, secteur: 'Banque', bg: '#fff' },
];

const SERVICES = [
  { icon: '💼', titre: "L'Intérim Expert", desc: "Remplacement ou surcroît d'activité pour Team Leaders, Formateurs et experts GRC.", duree: '1 à 6 mois' },
  { icon: '🚀', titre: 'Management de Transition', desc: "Accompagnement des phases critiques : restructuration, lancement de projets, transformation digitale.", duree: '3 à 12 mois' },
  { icon: '🤝', titre: 'Pré-embauche CDI', desc: "Mission d'intérim avec option CDI. Évaluez un profil en situation réelle avant engagement définitif.", duree: '6 mois + CDI' },
];

const SECTEURS = [
  { icon: '📞', titre: 'BPO & Call Centers', desc: 'Concentrix, Majorel, Intelcia…' },
  { icon: '📡', titre: 'Télécoms & FAI', desc: 'Orange, Free Sénégal…' },
  { icon: '🏦', titre: 'Banques & Assurances', desc: 'Profils bilingues réglementaires' },
  { icon: '📱', titre: 'Fintechs & Startups', desc: 'Wave, Orange Money…' },
];

const TEMOIGNAGES = [
  { text: "En 36h nous avions 3 profils parfaitement qualifiés. La garantie de remplacement nous a vraiment rassurés.", nom: 'Aminata Ndiaye', role: 'DRH — Concentrix Sénégal', initiales: 'AN' },
  { text: "Le niveau de spécialisation GRC est incomparable avec les agences généralistes. Nos équipes sont opérationnelles dès J+1.", nom: 'Ibrahim Diop', role: 'Responsable RH — Orange Sénégal', initiales: 'ID' },
  { text: "Les candidats maîtrisent nos outils CRM dès le premier jour. Énorme gain de temps en formation interne.", nom: 'Sophie Mensah', role: "Head of People — Wave", initiales: 'SM' },
];

const FAQ = [
  { q: "Comment fonctionne le recrutement STC ?", r: "Nous réceptionnons votre besoin, sélectionnons les candidats de notre base qualifiée et vous proposons des profils testés sous 48h. Vous retenez le profil qui vous convient, nous gérons le reste (contrat, paie, suivi)." },
  { q: "Quels types de contrats proposez-vous ?", r: "Nous proposons l'intérim (1 à 6 mois), le management de transition (3 à 12 mois) et la pré-embauche (6 mois avec option CDI). Chaque formule est contractualisée selon vos besoins." },
  { q: "Comment sont testés les candidats ?", r: "Chaque candidat passe des tests techniques obligatoires : orthographe, élocution, maîtrise des outils Office et CRM. Les scores sont accessibles dans nos rapports de présentation." },
  { q: "Qu'est-ce que la garantie de remplacement ?", r: "Si un candidat ne convient pas dans les 30 premiers jours de la mission, nous procédons à son remplacement sans frais supplémentaires." },
  { q: "Comment candidater chez STC ?", r: "Créez votre compte en ligne, complétez votre profil en 3 étapes et passez nos tests techniques. Notre équipe analyse votre dossier et vous contacte dès qu'une mission correspond à votre profil." },
  { q: "STC est-il présent en dehors de Dakar ?", r: "Notre siège est à Sacré-Cœur 3 VDN à Dakar. Nous intervenons sur tout le Sénégal et avons pour ambition de couvrir 3 pays d'Afrique de l'Ouest à horizon 5 ans." },
];

export default function Accueil() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className={styles.page}>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />

        {/* Gauche — texte */}
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <span className={styles.tagDot} />
            Premier cabinet spécialisé GRC au Sénégal
          </div>
          <h1 className={styles.heroTitle}>
            Les meilleurs<br />talents <em>GRC</em><br />disponibles en <em>48h</em>
          </h1>
          <p className={styles.heroSub}>
            Cabinet de recrutement et d'intérim exclusivement dédié à la Gestion de la Relation Client.
            Experts testés, opérationnels dès le premier jour.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate('/entreprises')}>
              Recruter un expert →
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/inscription')}>
              Déposer mon CV
            </button>
          </div>
          <div className={styles.trustRow}>
            {['⚡ 48h de délai', '✅ 100% testés', '🔄 Remplacement garanti'].map(t => (
              <span key={t} className={styles.trustBadge}>{t}</span>
            ))}
          </div>
        </div>

        {/* Droite — photo + cards flottantes */}
        <div className={styles.heroVisual}>
          {/* Photo d'illustration — jeune professionnel GRC */}
          <div className={styles.photoFrame}>
            <div className={styles.photoPlaceholder}>
              <div className={styles.photoScene}>
                {/* Simulation d'une photo de candidat au bureau */}
                <div className={styles.photoDesk}>
                  <div className={styles.photoMonitor} />
                  <div className={styles.photoKeyboard} />
                </div>
                <div className={styles.photoFigure}>
                  <div className={styles.photoHead} />
                  <div className={styles.photoBody} />
                  <div className={styles.photoHeadset} />
                </div>
                <div className={styles.photoLabel}>Candidat GRC · Dakar</div>
              </div>
            </div>
            {/* Logo STC en overlay */}
            <div className={styles.logoOverlay}>
              <img src={logo} alt="STC" className={styles.logoOverlayImg} />
            </div>
          </div>

          {/* Cards flottantes */}
          <div className={`${styles.floatCard} ${styles.fc1}`}>
            <div className={styles.fcDot} style={{ background: '#27AE60' }} />
            <div>
              <div className={styles.fcVal}>+120</div>
              <div className={styles.fcLabel}>candidats en base</div>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.fc2}`}>
            <div className={styles.fcDot} style={{ background: '#F5A623' }} />
            <div>
              <div className={styles.fcVal}>48h</div>
              <div className={styles.fcLabel}>délai garanti</div>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.fc3}`}>
            <div className={styles.fcDot} style={{ background: '#0013FF' }} />
            <div>
              <div className={styles.fcVal}>100%</div>
              <div className={styles.fcLabel}>candidats testés</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOUBLE ENTRÉE ===== */}
      <div className={styles.doubleEntry}>
        <div className={`${styles.entry} ${styles.entEnt}`} onClick={() => navigate('/entreprises')}>
          <div className={styles.entIcon}>🏢</div>
          <div className={styles.entBadge}>Espace Entreprises</div>
          <h2>Trouvez l'expert GRC qu'il vous faut</h2>
          <p>Profils pré-qualifiés sous 48h. Contrat sur mesure. Remplacement garanti.</p>
          <span className={styles.entArrow}>Accéder →</span>
        </div>
        <div className={`${styles.entry} ${styles.entCand}`} onClick={() => navigate('/candidats')}>
          <div className={styles.entIcon}>👤</div>
          <div className={`${styles.entBadge} ${styles.entBadgeOrange}`}>Espace Candidats</div>
          <h2>Boostez votre carrière dans la GRC</h2>
          <p>Déposez votre CV, passez nos tests et rejoignez les meilleures équipes de Dakar.</p>
          <span className={`${styles.entArrow} ${styles.entArrowOrange}`}>Accéder →</span>
        </div>
      </div>

      {/* ===== QUI SOMMES-NOUS ===== */}
      <section className={styles.aboutSection}>
        <div className={styles.sectionWrap}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.sectionTag}>Qui sommes-nous ?</span>
              <h2 className={styles.sectionTitle}>Le 1er cabinet 100% dédié à la GRC au Sénégal</h2>
              <p className={styles.aboutText}>
                Sunu Training Center est né d'un constat simple : les agences généralistes ne comprennent pas les spécificités des métiers de la Relation Client. Nous avons donc créé un cabinet 100% dédié à la GRC, avec des recruteurs issus du secteur.
              </p>
              <p className={styles.aboutText}>
                Basé à Dakar Sacré-Cœur 3 VDN, nous servons les centres d'appels, banques, télécoms et fintechs avec une promesse ferme : des experts opérationnels sous 48h et un remplacement garanti.
              </p>
              <div className={styles.featGrid}>
                {['🎯 Spécialisation 100% GRC', '⚡ Réactivité 48h', '✅ Tests techniques systématiques', '🔄 Remplacement garanti', '📋 Gestion RH complète', '🌍 Vision Afrique de l\'Ouest'].map(f => (
                  <div key={f} className={styles.featItem}>{f}</div>
                ))}
              </div>
            </div>
            <div className={styles.kpiGrid}>
              {[
                { val: '48h', label: 'Délai de réponse garanti', color: '#0013FF' },
                { val: '100%', label: 'Candidats testés techniquement', color: '#3352FF' },
                { val: '5', label: 'Secteurs GRC couverts', color: '#000B99' },
                { val: '3', label: 'Formules de service', color: '#0013FF' },
              ].map(k => (
                <div key={k.val} className={styles.kpiCard} style={{ background: k.color }}>
                  <div className={styles.kpiVal}>{k.val}</div>
                  <div className={styles.kpiLabel}>{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionWrap}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className={styles.sectionTag} style={{ display: 'inline-block' }}>Nos formules</span>
            <h2 className={styles.sectionTitle}>Trois services, une seule promesse</h2>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div key={s.titre} className={styles.serviceCard}>
                <div className={styles.serviceNum}>0{i + 1}</div>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.titre}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <span className={styles.serviceDuree}>{s.duree}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTEURS ===== */}
      <section className={styles.secteursSection}>
        <div className={styles.sectionWrap}>
          <span className={styles.sectionTag}>Secteurs cibles</span>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 32 }}>Nous couvrons vos secteurs</h2>
          <div className={styles.secteursGrid}>
            {SECTEURS.map(s => (
              <div key={s.titre} className={styles.secteurCard} onClick={() => navigate('/entreprises')}>
                <div className={styles.secteurIcon}>{s.icon}</div>
                <h4 className={styles.secteurTitle}>{s.titre}</h4>
                <p className={styles.secteurDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMOIGNAGES ===== */}
      <section className={styles.temoSection}>
        <div className={styles.sectionWrap}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className={styles.sectionTagLight}>Témoignages</span>
            <h2 className={styles.sectionTitleLight}>Ils nous font confiance</h2>
          </div>
          <div className={styles.temoGrid}>
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className={styles.temoCard}>
                <div className={styles.temoQuote}>"</div>
                <p className={styles.temoText}>{t.text}</p>
                <div className={styles.temoFooter}>
                  <div className={styles.temoAvatar}>{t.initiales}</div>
                  <div>
                    <div className={styles.temoNom}>{t.nom}</div>
                    <div className={styles.temoRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqSection}>
        <div className={styles.sectionWrap}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className={styles.sectionTag} style={{ display: 'inline-block' }}>FAQ</span>
            <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
          </div>
          <div className={styles.faqGrid}>
            {FAQ.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && <div className={styles.faqA}>{item.r}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTENAIRES ===== */}
      <section className={styles.partenairesSection}>
        <div className={styles.sectionWrap}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className={styles.sectionTag} style={{ display: 'inline-block' }}>Ils nous font confiance</span>
            <h2 className={styles.sectionTitle}>Entreprises Partenaires</h2>
            <p className={styles.sectionDesc}>Nous collaborons avec les leaders du secteur GRC au Sénégal et en Afrique de l'Ouest.</p>
          </div>
          <div className={styles.partenairesGrid}>
            {PARTENAIRES.map(p => (
              <div key={p.nom} className={styles.partenaireCard}>
                <div className={styles.partenaireLogoBox} style={{ background: p.bg }}>
                  <img src={p.logo} alt={p.nom} className={styles.partenaireLogoImg} />
                </div>
                <div className={styles.partenaireNom}>{p.nom}</div>
                <div className={styles.partenaireSecteur}>{p.secteur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionWrap} style={{ textAlign: 'center' }}>
          <h2 className={styles.ctaTitle}>Prêt à travailler avec les meilleurs talents GRC ?</h2>
          <p className={styles.ctaSub}>
            Déposez votre besoin ou créez votre profil candidat. Notre équipe vous répond sous 48h.
          </p>
          <div className={styles.ctaBtns}>
            <button className={styles.ctaBtnPrimary} onClick={() => navigate('/entreprises')}>
              Recruter un expert →
            </button>
            <button className={styles.ctaBtnSecondary} onClick={() => navigate('/inscription')}>
              Je suis candidat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
