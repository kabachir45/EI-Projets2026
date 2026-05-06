import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { tests } from '../mock/mockData';
import styles from './EspaceCandidat.module.css';

const SECTEURS_OPT = ["BPO/Centre d'appels", 'Télécoms', 'Banque', 'Assurance', 'Fintech', 'Commerce', 'Autre'];
const POSTES_OPT = ['Téléconseiller', 'Team Leader', 'Superviseur', 'Formateur GRC', 'Chargé de clientèle', 'Back-office', 'Autre'];
const CRM_OPT = ['Salesforce', 'Zendesk', 'HubSpot', 'Freshdesk', 'Oracle', 'Dynamics', 'Odoo', 'Autre'];
const LANGUES_OPT = ['Français', 'Anglais', 'Wolof', 'Arabe', 'Portugais', 'Espagnol'];
const CONTRAT_OPT = ['Intérim', 'CDI', 'CDD', 'Management de transition', 'Temps partiel'];
const DUREE_OPT = ['1-3 mois', '3-6 mois', '6-12 mois', '+12 mois'];
const MOBILITE_OPT = ['Dakar uniquement', 'Région Dakar', 'Tout le Sénégal', "Afrique de l'Ouest"];
const MISSIONS_OPT = ['Service entrant', 'Service sortant', 'Support technique', 'Recouvrement', 'Rétention', 'Vente'];

function CheckGroup({ options, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div className="check-group">
      {options.map(o => (
        <label key={o} className={`check-item ${value.includes(o) ? 'checked' : ''}`} onClick={() => toggle(o)}>
          <input type="checkbox" readOnly checked={value.includes(o)} />
          {o}
        </label>
      ))}
    </div>
  );
}

function TestModal({ test, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    let score = 0;
    test.questions.forEach((q, i) => { if (answers[i] === q.rep) score++; });
    const pct = Math.round((score / test.questions.length) * 100);
    onSubmit(test.id, pct);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && submitted && onClose()}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">{test.icone} {test.titre}</h2>
        {!submitted ? (
          <>
            <div style={{ marginBottom: 8, fontSize: '0.8rem', color: 'var(--muted)' }}>Question {step + 1} / {test.questions.length}</div>
            <div className="progress" style={{ marginBottom: 20 }}>
              <div className="progress-bar progress-primary" style={{ width: `${((step + 1) / test.questions.length) * 100}%` }} />
            </div>
            <div className={styles.testQ}>
              <h4>{test.questions[step].q}</h4>
              {test.questions[step].opts.map((o, i) => (
                <div
                  key={i}
                  className={`${styles.testOpt} ${answers[step] === i ? styles.testOptSelected : ''}`}
                  onClick={() => setAnswers({ ...answers, [step]: i })}
                >
                  <span className={styles.testOptLetter}>{String.fromCharCode(65 + i)}</span>
                  {o}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              {step > 0 ? <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>← Retour</button> : <span />}
              {step < test.questions.length - 1
                ? <button className="btn btn-primary btn-sm" onClick={() => setStep(step + 1)} disabled={answers[step] === undefined}>Suivant →</button>
                : <button className="btn btn-accent btn-sm" onClick={submit} disabled={answers[step] === undefined}>Soumettre ✓</button>
              }
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Test complété !</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Votre résultat a été enregistré. Notre équipe l'utilisera pour votre évaluation.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EspaceCandidat() {
  const { user } = useAuth();
  const { candidats, updateCandidatProfil, saveTestResult, testResults, accepterFormation, refuserFormation } = useData();
  const navigate = useNavigate();

  if (!user || user.role !== 'candidat') {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', marginBottom: 12 }}>Accès réservé aux candidats</h2>
        <button className="btn btn-primary" onClick={() => navigate('/connexion')}>Se connecter</button>
      </div>
    );
  }

  const candidat = candidats.find(c => c.id === user.candidatId);
  const [tab, setTab] = useState('profil');
  const [step, setStep] = useState(1);
  const [profil, setProfil] = useState(candidat || {});
  const [testModal, setTestModal] = useState(null);
  const [saved, setSaved] = useState(false);
  const [cvName, setCvName] = useState(candidat?.cvUploaded ? 'CV téléchargé ✓' : '');

  if (!candidat) return <div style={{ padding: '100px 5%' }}>Candidat introuvable.</div>;

  const testsComplets = tests.filter(t => testResults[`${candidat.id}_${t.id}`] !== undefined).length;
  const progress = Math.round((
    (profil.prenom ? 10 : 0) + (profil.secteurs?.length ? 20 : 0) +
    (profil.outilsCRM?.length ? 20 : 0) + (cvName ? 20 : 0) + (testsComplets * 7.5)
  ));

  const saveProfil = () => {
    updateCandidatProfil(candidat.id, { ...profil, cvUploaded: !!cvName });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestSubmit = (testId, score) => {
    saveTestResult(candidat.id, testId, score);
    setTestModal(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Bonjour, {candidat.prenom} 👋</h1>
          <p>Gérez votre profil, vos tests et suivez vos propositions</p>
        </div>
        <div className={styles.headerStatus}>
          <span className={`status-dot ${candidat.statut === 'Validé' ? 'status-green' : candidat.statut === 'Nouveau' ? 'status-blue' : 'status-orange'}`}>
            {candidat.statut}
          </span>
        </div>
      </div>

      <div className="tabs">
        {[['profil', '👤 Mon Profil'], ['formations', '🎓 Formations'], ['candidatures', '📋 Mes Candidatures']].map(([key, label]) => (
          <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'profil' && (
        <div>
          <div className={styles.progressWrap}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Profil complété à {Math.min(progress, 100)}%</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Étape {step}/3</span>
            </div>
            <div className="progress"><div className="progress-bar progress-primary" style={{ width: `${Math.min(progress, 100)}%` }} /></div>
          </div>

          <div className="stepper">
            {[['Informations', 1], ['Profil pro', 2], ['Documents & Tests', 3]].map(([label, n], i) => (
              <div key={n} className="step-item">
                <div className={`step-circle ${step > n ? 'done' : step === n ? 'active' : 'pending'}`}>{step > n ? '✓' : n}</div>
                <span className={`step-text ${step > n ? 'done' : step === n ? 'active' : 'pending'}`}>{label}</span>
                {i < 2 && <div className={`step-line ${step > n ? 'done' : 'pending'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className={`card ${styles.stepCard}`}>
              <h3 className={styles.stepTitle}>Informations personnelles</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={profil.prenom || ''} onChange={e => setProfil({ ...profil, prenom: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Nom</label><input className="form-input" value={profil.nom || ''} onChange={e => setProfil({ ...profil, nom: e.target.value })} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" value={profil.telephone || ''} onChange={e => setProfil({ ...profil, telephone: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Ville</label>
                  <select className="form-select" value={profil.ville || ''} onChange={e => setProfil({ ...profil, ville: e.target.value })}>
                    {['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Autre'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Quartier</label><input className="form-input" value={profil.quartier || ''} onChange={e => setProfil({ ...profil, quartier: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Niveau d'études</label>
                  <select className="form-select" value={profil.niveauEtudes || ''} onChange={e => setProfil({ ...profil, niveauEtudes: e.target.value })}>
                    {['BAC', 'BAC+2', 'BAC+3', 'BAC+4', 'BAC+5', 'Formation pro'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Spécialité</label><input className="form-input" value={profil.specialite || ''} onChange={e => setProfil({ ...profil, specialite: e.target.value })} /></div>
            </div>
          )}

          {step === 2 && (
            <div className={`card ${styles.stepCard}`}>
              <h3 className={styles.stepTitle}>Profil professionnel</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Années d'expérience GRC</label>
                  <select className="form-select" value={profil.anneesGRC || ''} onChange={e => setProfil({ ...profil, anneesGRC: e.target.value })}>
                    {['0', '1-2 ans', '3-5 ans', '5-10 ans', '+10 ans'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Disponibilité</label>
                  <select className="form-select" value={profil.disponibilite || ''} onChange={e => setProfil({ ...profil, disponibilite: e.target.value })}>
                    {['Immédiate', 'Dans 15 jours', 'Dans 1 mois', 'Dans 3 mois', 'En poste, ouvert aux opportunités'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Secteurs d'expérience</label><CheckGroup options={SECTEURS_OPT} value={profil.secteurs || []} onChange={v => setProfil({ ...profil, secteurs: v })} /></div>
              <div className="form-group"><label className="form-label">Postes occupés</label><CheckGroup options={POSTES_OPT} value={profil.postes || []} onChange={v => setProfil({ ...profil, postes: v })} /></div>
              <div className="form-group"><label className="form-label">Outils CRM maîtrisés</label><CheckGroup options={CRM_OPT} value={profil.outilsCRM || []} onChange={v => setProfil({ ...profil, outilsCRM: v })} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Niveau français oral</label>
                  <select className="form-select" value={profil.francaisOral || ''} onChange={e => setProfil({ ...profil, francaisOral: e.target.value })}>
                    {['Débutant', 'Intermédiaire', 'Courant', 'Bilingue'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Niveau anglais oral</label>
                  <select className="form-select" value={profil.anglaisOral || ''} onChange={e => setProfil({ ...profil, anglaisOral: e.target.value })}>
                    {['N/A', 'Débutant', 'Intermédiaire', 'Courant', 'Bilingue'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Langues parlées</label><CheckGroup options={LANGUES_OPT} value={profil.langues || []} onChange={v => setProfil({ ...profil, langues: v })} /></div>
              <div className="form-group"><label className="form-label">Type de contrat souhaité</label><CheckGroup options={CONTRAT_OPT} value={profil.typeContrat || []} onChange={v => setProfil({ ...profil, typeContrat: v })} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Prétentions salariales</label>
                  <select className="form-select" value={profil.pretentions || ''} onChange={e => setProfil({ ...profil, pretentions: e.target.value })}>
                    {['<100k FCFA', '100-200k FCFA', '200-350k FCFA', '350-500k FCFA', '+500k FCFA'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Télétravail</label>
                  <select className="form-select" value={profil.teletravail || ''} onChange={e => setProfil({ ...profil, teletravail: e.target.value })}>
                    {['Oui uniquement', 'Non', 'Hybride', 'Pas de préférence'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`card ${styles.stepCard}`}>
              <h3 className={styles.stepTitle}>Documents & Tests techniques</h3>
              <div className={styles.uploadArea} onClick={() => document.getElementById('cv-upload').click()}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>📄</div>
                <p style={{ fontWeight: 600, color: 'var(--navy)' }}>Déposer votre CV</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{cvName || 'PDF, DOC — 5 Mo max'}</p>
                <input id="cv-upload" type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx" onChange={e => e.target.files[0] && setCvName('✅ ' + e.target.files[0].name)} />
              </div>

              <h4 style={{ fontWeight: 700, color: 'var(--navy)', margin: '20px 0 14px' }}>Tests techniques</h4>
              <div className={styles.testsList}>
                {tests.map(t => {
                  const done = testResults[`${candidat.id}_${t.id}`] !== undefined;
                  return (
                    <div key={t.id} className={styles.testItem}>
                      <div className={styles.testInfo}>
                        <span className={styles.testIcon}>{t.icone}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.titre}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>⏱ {t.duree} · {t.points} points</div>
                        </div>
                      </div>
                      {done
                        ? <span className="status-dot status-green">Complété</span>
                        : <button className="btn btn-primary btn-sm" onClick={() => setTestModal(t)}>Commencer</button>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.stepNav}>
            {step > 1 ? <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Retour</button> : <span />}
            <div style={{ display: 'flex', gap: 10 }}>
              {saved && <span style={{ color: 'var(--success)', fontSize: '0.88rem', alignSelf: 'center' }}>✓ Enregistré</span>}
              <button className="btn btn-ghost btn-sm" onClick={saveProfil}>Enregistrer</button>
              {step < 3
                ? <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Suivant →</button>
                : <button className="btn btn-accent" onClick={saveProfil}>Sauvegarder le profil ✓</button>
              }
            </div>
          </div>
        </div>
      )}

      {tab === 'formations' && (
        <div>
          <div className="alert alert-info" style={{ marginBottom: 20 }}>
            💡 Ces formations vous ont été proposées par nos recruteurs en lien avec votre profil ou une mission en cours.
          </div>
          {candidat.formations.length === 0 ? (
            <div className={styles.emptyState}>
              <span style={{ fontSize: '2.5rem' }}>🎓</span>
              <p>Aucune formation proposée pour le moment. Complétez votre profil pour recevoir des propositions personnalisées.</p>
            </div>
          ) : (
            <div className={styles.formationsList}>
              {candidat.formations.map(f => (
                <div key={f.id} className={`card ${styles.formationCard}`}>
                  <div className={styles.formationHeader}>
                    <div>
                      <h3 className={styles.formationTitle}>{f.titre}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.83rem' }}>📅 {f.date}</p>
                    </div>
                    <span className={`status-dot ${f.statut === 'Acceptée' ? 'status-green' : f.statut === 'Refusée' ? 'status-red' : 'status-orange'}`}>
                      {f.statut}
                    </span>
                  </div>
                  {f.statut === 'En attente' && (
                    <div className={styles.formationActions}>
                      <button className="btn btn-success btn-sm" onClick={() => accepterFormation(candidat.id, f.id)}>✓ Accepter</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => refuserFormation(candidat.id, f.id)}>✗ Décliner</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'candidatures' && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Offre</th><th>Entreprise</th><th>Date</th><th>Statut</th></tr></thead>
            <tbody>
              {candidat.candidatures.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>Aucune candidature en cours.</td></tr>
              ) : candidat.candidatures.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.entreprise}</td>
                  <td>{c.entreprise}</td>
                  <td style={{ color: 'var(--muted)' }}>{c.date}</td>
                  <td><span className={`status-dot ${c.statut === 'Retenu' ? 'status-green' : c.statut === 'Non retenu' ? 'status-red' : 'status-orange'}`}>{c.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {testModal && <TestModal test={testModal} onClose={() => setTestModal(null)} onSubmit={handleTestSubmit} />}
    </div>
  );
}
