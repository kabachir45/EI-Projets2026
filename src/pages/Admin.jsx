import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { statsAdmin, formations as formationsData, tests } from '../mock/mockData';
import styles from './Admin.module.css';

const SIDEBAR = [
  { key: 'stats', icon: '📊', label: 'Tableau de bord' },
  { key: 'candidats', icon: '👤', label: 'Candidats' },
  { key: 'entreprises', icon: '🏢', label: 'Entreprises' },
  { key: 'offres', icon: '📋', label: 'Offres' },
  { key: 'missions', icon: '🎯', label: 'Missions' },
  { key: 'formations', icon: '🎓', label: 'Formations' },
  { key: 'messages', icon: '💬', label: 'Échanges' },
];

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('stats');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', marginBottom: 12 }}>Accès réservé à l'administration</h2>
        <button className="btn btn-primary" onClick={() => navigate('/connexion')}>Se connecter</button>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarBrand}>
          <span>STC</span> Admin
        </div>
        {SIDEBAR.map(item => (
          <button key={item.key} className={`${styles.sidebarItem} ${tab === item.key ? styles.active : ''}`} onClick={() => { setTab(item.key); setSidebarOpen(false); }}>
            <span className={styles.sidebarIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/'); }}>⏻ Déconnexion</button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.topbar}>
          <button className={styles.burger} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1 className={styles.pageTitle}>{SIDEBAR.find(s => s.key === tab)?.label}</h1>
          <span className={styles.adminName}>{user.nom}</span>
        </div>

        <div className={styles.content}>
          {tab === 'stats' && <StatsView />}
          {tab === 'candidats' && <CandidatsView />}
          {tab === 'entreprises' && <EntreprisesView />}
          {tab === 'offres' && <OffresView />}
          {tab === 'missions' && <MissionsView />}
          {tab === 'formations' && <FormationsView />}
          {tab === 'messages' && <MessagesView />}
        </div>
      </div>
    </div>
  );
}

// ===== STATS =====
function StatsView() {
  const { candidats, entreprises, offres } = useData();
  const kpis = [
    { icon: '👤', val: candidats.length, label: 'Candidats en base', type: '' },
    { icon: '🆕', val: statsAdmin.nouveauxCetteSemaine, label: 'Nouveaux cette semaine', type: '' },
    { icon: '🏢', val: entreprises.filter(e => e.statut === 'Validé').length, label: 'Entreprises actives', type: 'success' },
    { icon: '⏳', val: entreprises.filter(e => e.statut !== 'Validé').length, label: 'Entreprises en attente', type: 'warning' },
    { icon: '📋', val: offres.filter(o => o.statut === 'Publiée').length, label: 'Offres publiées', type: 'success' },
    { icon: '⚡', val: statsAdmin.delaiMoyenReponse, label: 'Délai moyen réponse', type: 'success' },
    { icon: '🎯', val: statsAdmin.missionsEnCours, label: 'Missions en cours', type: '' },
    { icon: '🎓', val: statsAdmin.scoreMoyenTests + '/100', label: 'Score moyen tests', type: '' },
    { icon: '📈', val: '15%', label: 'Croissance secteur BPO', type: 'success' },
  ];

  return (
    <div>
      <div className={styles.kpiGrid}>
        {kpis.map((k, i) => (
          <div key={i} className={`${styles.kpiCard} ${k.type ? styles[k.type] : ''}`}>
            <div className={styles.kpiIcon}>{k.icon}</div>
            <div className={styles.kpiVal}>{k.val}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={`card ${styles.chartCard}`}>
          <h3 className={styles.chartTitle}>Inscriptions candidats — 6 derniers mois</h3>
          <div className={styles.barChart}>
            {statsAdmin.inscriptionsMois.map(m => (
              <div key={m.mois} className={styles.barCol}>
                <span className={styles.barVal}>{m.nb}</span>
                <div className={styles.bar} style={{ height: `${m.nb * 14}px`, background: m.nb > 0 ? 'var(--primary)' : 'var(--border)' }} />
                <span className={styles.barLabel}>{m.mois}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`card ${styles.chartCard}`}>
          <h3 className={styles.chartTitle}>Répartition par secteur</h3>
          {statsAdmin.repartitionSecteurs.map(s => (
            <div key={s.secteur} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                <span style={{ color: 'var(--muted)' }}>{s.secteur}</span>
                <span style={{ fontWeight: 700 }}>{s.pct}%</span>
              </div>
              <div className="progress"><div className="progress-bar progress-primary" style={{ width: `${s.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.alertsSection}>
        <h3 className={styles.alertsTitle}>Tâches en attente</h3>
        <div className="alert alert-warning" style={{ cursor: 'pointer' }}>⚠️ Entreprises en attente de validation</div>
        <div className="alert alert-warning" style={{ cursor: 'pointer' }}>⚠️ Offres en attente de modération</div>
        <div className="alert alert-success" style={{ cursor: 'pointer' }}>✅ Nouvelles candidatures à traiter</div>
      </div>
    </div>
  );
}

// ===== CANDIDATS =====
function CandidatsView() {
  const { candidats, updateCandidatStatut, offres, proposerCandidatAEntreprise, proposerFormation, testResults } = useData();
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterSecteur, setFilterSecteur] = useState('');
  const [modalCandid, setModalCandid] = useState(null);

  let data = candidats.filter(c =>
    (search === '' || `${c.prenom} ${c.nom}`.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatut === '' || c.statut === filterStatut) &&
    (filterSecteur === '' || c.secteurs?.includes(filterSecteur))
  );

  return (
    <div>
      <div className="table-wrap">
        <div className="table-toolbar">
          <div className="search-box"><input className="form-input" placeholder="Rechercher par nom…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} /></div>
          <select className="form-select" style={{ width: 160 }} value={filterSecteur} onChange={e => setFilterSecteur(e.target.value)}>
            <option value="">Tous secteurs</option>
            {["BPO/Centre d'appels", 'Télécoms', 'Banque', 'Fintech'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-select" style={{ width: 160 }} value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
            <option value="">Tous statuts</option>
            {['Nouveau', 'Présélectionné', 'Validé', 'En mission'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-ghost btn-sm" onClick={() => alert('Export CSV simulé')}>📥 Export CSV</button>
        </div>
        <table>
          <thead><tr><th>#</th><th>Nom</th><th>Score</th><th>Secteurs</th><th>Disponibilité</th><th>Statut</th><th>Inscription</th><th>Actions</th></tr></thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id}>
                <td style={{ color: 'var(--muted)' }}>{c.id}</td>
                <td><strong>{c.prenom} {c.nom}</strong><br /><small style={{ color: 'var(--muted)' }}>{c.email}</small></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 50, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${c.scoreTest}%`, background: c.scoreTest >= 80 ? 'var(--success)' : c.scoreTest >= 65 ? 'var(--warning)' : 'var(--danger)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{c.scoreTest}/100</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.78rem' }}>{c.secteurs?.join(', ')}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{c.disponibilite}</td>
                <td><span className={`status-dot ${c.statut === 'Validé' ? 'status-green' : c.statut === 'Nouveau' ? 'status-blue' : c.statut === 'En mission' ? 'status-orange' : 'status-orange'}`}>{c.statut}</span></td>
                <td style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{c.dateInscription}</td>
                <td><button className="btn btn-outline btn-sm" onClick={() => setModalCandid(c)}>Voir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalCandid && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalCandid(null)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalCandid(null)}>✕</button>
            <div className="modal-title">{modalCandid.prenom} {modalCandid.nom}</div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              {[['📧', modalCandid.email], ['📞', modalCandid.telephone], ['🎓', modalCandid.niveauEtudes], ['⏱', modalCandid.anneesGRC + ' en GRC'], ['📍', modalCandid.ville], ['💰', modalCandid.pretentions]].map(([i, v]) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: 2 }}>{i}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 8 }}>Scores tests</div>
              {tests.map(t => {
                const sc = testResults[`${modalCandid.id}_${t.id}`] ?? Math.round(modalCandid.scoreTest * (0.8 + Math.random() * 0.4));
                return (
                  <div key={t.id} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
                      <span>{t.icone} {t.titre}</span>
                      <span style={{ fontWeight: 700 }}>{sc}/100</span>
                    </div>
                    <div className="progress"><div className="progress-bar" style={{ width: `${sc}%`, background: sc >= 80 ? 'var(--success)' : sc >= 65 ? 'var(--warning)' : 'var(--danger)' }} /></div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              <select className="form-select" style={{ flex: 1 }} defaultValue={modalCandid.statut} onChange={e => updateCandidatStatut(modalCandid.id, e.target.value)}>
                {['Nouveau', 'Présélectionné', 'Validé', 'En mission', 'Archivé'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 8 }}>Proposer à une offre</div>
              <select className="form-select" onChange={e => { if (e.target.value) { proposerCandidatAEntreprise(+e.target.value, modalCandid.id); alert('Candidat proposé !'); } }}>
                <option value="">Sélectionner une offre…</option>
                {offres.filter(o => o.statut === 'Publiée').map(o => <option key={o.id} value={o.id}>{o.titre} — {o.entreprise}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 8 }}>Proposer une formation</div>
              <select className="form-select" onChange={e => { if (e.target.value) { proposerFormation(modalCandid.id, +e.target.value); alert('Formation proposée !'); } }}>
                <option value="">Sélectionner une formation…</option>
                {formationsData.map(f => <option key={f.id} value={f.id}>{f.titre}</option>)}
              </select>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={() => alert('Téléchargement CV simulé')}>📥 Télécharger CV</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== ENTREPRISES =====
function EntreprisesView() {
  const { entreprises, updateEntrepriseStatut } = useData();
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Raison sociale</th><th>Secteur</th><th>Contact</th><th>Plan</th><th>Offres</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>
          {entreprises.map(e => (
            <tr key={e.id}>
              <td style={{ color: 'var(--muted)' }}>{e.id}</td>
              <td><strong>{e.raisonSociale}</strong></td>
              <td><span className="badge badge-gray">{e.secteur}</span></td>
              <td><div style={{ fontSize: '0.83rem' }}>{e.contact}<br /><small style={{ color: 'var(--muted)' }}>{e.fonction}</small></div></td>
              <td><span className="badge badge-blue">{e.abonnement}</span></td>
              <td style={{ textAlign: 'center', fontWeight: 700 }}>{e.offresActives}</td>
              <td><span className={`status-dot ${e.statut === 'Validé' ? 'status-green' : 'status-orange'}`}>{e.statut}</span></td>
              <td>
                {e.statut !== 'Validé' ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-success btn-sm" onClick={() => updateEntrepriseStatut(e.id, 'Validé')}>✓ Valider</button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateEntrepriseStatut(e.id, 'Refusé')}>✗</button>
                  </div>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={() => alert(`Fiche : ${e.raisonSociale}`)}>Voir</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===== OFFRES =====
function OffresView() {
  const { offres, candidats, updateOffreStatut } = useData();
  const [modalOffre, setModalOffre] = useState(null);

  return (
    <div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Titre</th><th>Entreprise</th><th>Type</th><th>Profils</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {offres.map(o => (
              <tr key={o.id}>
                <td style={{ color: 'var(--muted)' }}>{o.id}</td>
                <td style={{ fontWeight: 600 }}>{o.titre}</td>
                <td>{o.entreprise}</td>
                <td><span className="badge badge-blue">{o.typeMission}</span></td>
                <td style={{ textAlign: 'center' }}>{o.nbProfils}</td>
                <td><span className={`status-dot ${o.statut === 'Publiée' ? 'status-green' : o.statut === 'Dépubliée' ? 'status-red' : 'status-orange'}`}>{o.statut}</span></td>
                <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{o.datePublication}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModalOffre(o)}>Voir</button>
                    {o.statut === 'En attente de validation' && <button className="btn btn-success btn-sm" onClick={() => updateOffreStatut(o.id, 'Publiée')}>Valider</button>}
                    {o.statut === 'Publiée' && <button className="btn btn-danger btn-sm" onClick={() => updateOffreStatut(o.id, 'Dépubliée')}>Dépublier</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOffre && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalOffre(null)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalOffre(null)}>✕</button>
            <div className="modal-title">{modalOffre.titre}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="badge badge-blue">{modalOffre.typeMission}</span>
              <span className="badge badge-gray">{modalOffre.secteur}</span>
              <span className="badge badge-green">{modalOffre.duree}</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 14 }}>{modalOffre.description}</p>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              {[['📍', modalOffre.localisation], ['📅', modalOffre.dateDebut], ['👥', modalOffre.nbProfils + ' profil(s)'], ['🎓', modalOffre.niveauEtudes]].map(([i, v]) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 8, padding: '8px 12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{i} </span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 10 }}>
                Candidats matchés ({candidats.filter(c => c.secteurs?.includes(modalOffre.secteur)).length})
              </div>
              {candidats.filter(c => c.secteurs?.includes(modalOffre.secteur)).map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg)', borderRadius: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{c.prenom} {c.nom}</span>
                  <span className={`badge ${c.scoreTest >= 80 ? 'badge-green' : 'badge-orange'}`}>{c.scoreTest}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MISSIONS =====
function MissionsView() {
  const { missions } = useData();
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Candidat</th><th>Entreprise</th><th>Poste</th><th>Début</th><th>Fin prévue</th><th>Statut</th></tr></thead>
        <tbody>
          {missions.map(m => (
            <tr key={m.id}>
              <td style={{ fontWeight: 600 }}>{m.candidat}</td>
              <td>{m.entreprise}</td>
              <td>{m.poste}</td>
              <td style={{ color: 'var(--muted)' }}>{m.debut}</td>
              <td style={{ color: 'var(--muted)' }}>{m.finPrevue}</td>
              <td><span className="status-dot status-green">{m.statut}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===== FORMATIONS =====
function FormationsView() {
  const { candidats, proposerFormation } = useData();
  return (
    <div>
      <div className="alert alert-info" style={{ marginBottom: 20 }}>
        💡 Proposez des formations aux candidats depuis leur fiche (onglet Candidats → Voir → Proposer une formation).
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {formationsData.map(f => (
          <div key={f.id} className="card">
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{f.titre}</h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.83rem', marginBottom: 10, lineHeight: 1.6 }}>{f.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <span className="badge badge-blue">⏱ {f.duree}</span>
              <span className="badge badge-gray">{f.format}</span>
              <span className="badge badge-green">{f.placesRestantes} places</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 12 }}>📅 {f.date}</div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}>Candidats suggérés</div>
              {candidats.filter(c => c.secteurs?.some(s => f.secteurs.includes(s))).slice(0, 3).map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.82rem' }}>{c.prenom} {c.nom}</span>
                  <button className="btn btn-primary btn-sm" style={{ fontSize: '0.72rem', padding: '3px 10px' }} onClick={() => { proposerFormation(c.id, f.id); alert(`Formation proposée à ${c.prenom} !`); }}>
                    Proposer
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== MESSAGES =====
function MessagesView() {
  const { entreprises, messages, sendMessage } = useData();
  const [activeEnt, setActiveEnt] = useState(entreprises[1]?.id);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = () => {
    if (!newMsg.trim()) return;
    sendMessage(activeEnt, newMsg, 'admin');
    setNewMsg('');
  };

  const activeEntInfo = entreprises.find(e => e.id === activeEnt);
  const convMsgs = messages[activeEnt] || [];

  return (
    <div className={styles.messaging}>
      <div className={styles.msgSidebar}>
        <div className={styles.msgSidebarTitle}>Conversations</div>
        {entreprises.filter(e => e.statut === 'Validé').map(e => {
          const unread = (messages[e.id] || []).filter(m => m.from === 'entreprise').length;
          return (
            <div key={e.id} className={`${styles.convItem} ${activeEnt === e.id ? styles.convActive : ''}`} onClick={() => setActiveEnt(e.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className={styles.convName}>{e.raisonSociale}</span>
                {unread > 0 && <span className={styles.unreadBadge}>{unread}</span>}
              </div>
              <div className={styles.convPreview}>{e.contact}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.msgMain}>
        {activeEntInfo && (
          <div className={styles.msgHeader}>
            <strong>{activeEntInfo.raisonSociale}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem', marginLeft: 8 }}>— {activeEntInfo.contact}</span>
          </div>
        )}
        <div className={styles.msgBody}>
          {convMsgs.map(m => (
            <div key={m.id} className={`${styles.msgRow} ${m.from === 'admin' ? styles.msgMe : styles.msgThem}`}>
              <div className={styles.msgBubble}>{m.text}</div>
              <div className={styles.msgTime}>{m.date}</div>
            </div>
          ))}
          {convMsgs.length === 0 && <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: 32 }}>Aucun message.</p>}
        </div>
        <div className={styles.msgFooter}>
          <input className={styles.msgInput} placeholder="Votre message…" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="btn btn-primary btn-sm" onClick={handleSend}>Envoyer →</button>
        </div>
      </div>
    </div>
  );
}
