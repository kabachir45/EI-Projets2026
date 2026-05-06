import { useNavigate } from 'react-router-dom';
import { abonnements } from '../mock/mockData';
import styles from './Abonnements.module.css';

const COMPARE = [
  ['Spécialisation GRC 100%', true, false, false],
  ['Candidats testés techniquement', true, false, false],
  ['Délai de réponse 48h', true, '72h+', false],
  ['Remplacement garanti sans frais', true, false, false],
  ['Gestion RH & administrative', true, false, true],
  ['Formations incluses', 'Selon plan', false, false],
  ['Account manager dédié', 'Premium', false, false],
];

export default function Abonnements() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Abonnements entreprises</span>
          <h1>Des formules adaptées à <em>chaque besoin</em></h1>
          <p>Recrutez des experts GRC qualifiés sous 48h. Abonnez-vous au plan qui correspond à votre volume de recrutement.</p>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className={styles.plansGrid}>
          {abonnements.map(plan => (
            <div key={plan.id} className={`${styles.planCard} ${plan.badge ? styles.planFeatured : ''}`}>
              {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}
              <div className={styles.planHeader} style={{ borderColor: plan.couleur }}>
                <h2 className={styles.planNom} style={{ color: plan.couleur }}>{plan.nom}</h2>
                <div className={styles.planPrix}>{plan.prix}</div>
                <p className={styles.planSub}>par mois, sans engagement minimum</p>
              </div>
              <ul className={styles.featureList}>
                {plan.features.map(f => (
                  <li key={f} className={styles.featureItem}>
                    <span className={styles.featureCheck} style={{ color: plan.couleur }}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.nonInclus.map(f => (
                  <li key={f} className={`${styles.featureItem} ${styles.featureOff}`}>
                    <span className={styles.featureX}>✗</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${plan.badge ? 'btn-primary' : 'btn-outline'} btn-lg`}
                style={{ width: '100%', ...(plan.badge ? { background: plan.couleur, border: 'none' } : { color: plan.couleur, borderColor: plan.couleur }) }}
                onClick={() => navigate('/connexion')}
              >
                {plan.badge ? 'Commencer maintenant →' : 'Choisir ce plan'}
              </button>
            </div>
          ))}
        </div>

        <p className={styles.disclaimer}>
          💡 Tous les plans incluent la <strong>garantie de remplacement sans frais</strong> si un profil ne convient pas. 
          Pour les grandes missions de management de transition, contactez-nous directement.
        </p>
      </section>

      <section className={styles.compareSection}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title section-center" style={{ marginBottom: 32 }}>Pourquoi choisir STC plutôt qu'une agence classique ?</h2>
          <div className={styles.compareWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th style={{ color: 'var(--primary)' }}>🏆 STC</th>
                  <th>Agence généraliste</th>
                  <th>Recrutement direct</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, stc, agence, direct]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td className={styles.tdGood}>{stc === true ? '✅' : stc === false ? '—' : stc}</td>
                    <td className={styles.tdBad}>{agence === true ? '✅' : agence === false ? '✗' : agence}</td>
                    <td className={styles.tdBad}>{direct === true ? '✅' : direct === false ? '✗' : direct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionWrap}>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Questions fréquentes</h2>
          {[
            ['Puis-je changer de plan en cours de route ?', "Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. Le changement prend effet au début du mois suivant."],
            ['La garantie de remplacement est-elle vraiment gratuite ?', "Absolument. Si un candidat fourni ne convient pas dans les 30 premiers jours, nous le remplaçons sans aucun frais supplémentaire."],
            ['Qu\'est-ce qui différencie le plan Premium ?', "Le plan Premium vous donne accès à un account manager GRC dédié, des réponses sous 24h (au lieu de 48h), des formations incluses et des rapports KPIs hebdomadaires."],
            ['Y a-t-il un contrat d\'engagement minimum ?', "Non, tous nos plans sont sans engagement minimum. Vous pouvez résilier à tout moment avec un préavis d'un mois."],
          ].map(([q, r], i) => (
            <FaqItem key={i} q={q} r={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, r }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        {q} <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className={styles.faqA}>{r}</div>}
    </div>
  );
}

// local import
import { useState } from 'react';
