import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { abonnements } from '../mock/mockData';
import styles from './EspaceEntreprise.module.css';

export default function EspaceEntreprise() {
  const { user } = useAuth();
  const { entreprises, offres, candidats, messages, sendMessage, addOffre, selectionnerCandidat, sendDirectMessage, envoyerMessageEntrepriseCandidatKey } = useData();
  const navigate = useNavigate();
  const [tab, setTab] = useState('offres');
  const [newMsg, setNewMsg] = useState('');
  const [showOffreForm, setShowOffreForm] = useState(false);
  const [newOffre, setNewOffre] = useState({ titre: '', typeMission: 'Intérim', nbProfils: 1, description: '' });
  const [candidatFilter, setCandidatFilter] = useState('');
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [directMsg, setDirectMsg] = useState('');

  if (!user || user.role !== 'entreprise') {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', marginBottom: 12 }}>Accès réservé aux entreprises</h2>
        <button className="btn btn-primary" onClick={() => navigate('/connexion')}>Se connecter</button>
      </div>
    );
  }

  const entreprise = entreprises.find(e => e.id === user.entrepriseId);
  if (!entreprise) {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', marginBottom: 12 }}>Bienvenue {user.nom} 🏢</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Votre profil entreprise est en cours de création. Revenez dans quelques instants.</p>
      </div>
    );
  }

  const mesOffres = offres.filter(o => o.entrepriseId === entreprise.id);
  const mesMessages = messages[entreprise.id] || [];
  const abonnement = abonnements.find(a => a.id.toLowerCase() === (entreprise.abonnement || 'starter').toLowerCase());

  // All candidatures received across all our offers
  const allCandidaturesIds = [...new Set(mesOffres.flatMap(o => o.candidaturesIds || []))];
  const allCandidaturesDetails = allCandidaturesIds.map(cid => ({
    candidat: candidats.find(c => c.id === cid),
    offres: mesOffres.filter(o => (o.candidaturesIds || []).includes(cid)),
  })).filter(x => x.candidat);

  const handleSendMsg = () => {
    if (!newMsg.trim()) return;
    sendMessage(entreprise.id, newMsg, 'entreprise');
    setNewMsg('');
  };

  const handleAddOffre = () => {
    if (!newOffre.titre) return;
    addOffre({ ...newOffre, entreprise: entreprise.raisonSociale, entrepriseId: entreprise.id, secteur: entreprise.secteur });
    setNewOffre({ titre: '', typeMission: 'Intérim', nbProfils: 1, description: '' });
    setShowOffreForm(false);
  };

  // Candidats search/browse
  const validCandidats = candidats.filter(c => c.statut === 'Validé' || c.statut === 'Présélectionné');
  const filteredCandidats = validCandidats.filter(c => {
    if (!candidatFilter) return true;
    const q = candidatFilter.toLowerCase();
    return (
      c.prenom?.toLowerCase().includes(q) ||
      c.nom?.toLowerCase().includes(q) ||
      c.secteurs?.some(s => s.toLowerCase().includes(q)) ||
      c.postes?.some(p => p.toLowerCase().includes(q)) ||
      c.outilsCRM?.some(t => t.toLowerCase().includes(q))
    );
  });

  const handleSendDirectMsg = () => {
    if (!directMsg.trim() || !selectedCandidat) return;
    sendDirectMessage(entreprise.id, selectedCandidat.id, directMsg, 'entreprise');
    setDirectMsg('');
  };

  const getDirectMessages = (candidatId) => {
    const key = envoyerMessageEntrepriseCandidatKey(entreprise.id, candidatId);
    return messages[key] || [];
  };

  const TABS = [
    ['offres', '📋 Offres & Besoins'],
    ['candidatures', `📥 Candidatures (${allCandidaturesIds.length})`],
    ['parcourir', '🔍 Parcourir les candidats'],
    ['compte', '🏢 Mon Compte'],
    ['messages', '💬 Support STC'],
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Bienvenue, {entreprise.raisonSociale} 🏢</h1>
          <p>Gérez vos besoins en recrutement GRC</p>
        </div>
        <div className={styles.planBadge} style={{ background: abonnement?.couleur || 'var(--primary)' }}>
          {entreprise.abonnement || 'Starter'}
        </div>
      </div>

      <div className="tabs" style={{ flexWrap: 'wrap' }}>
        {TABS.map(([k, l]) => (
          <button key={k} className={`tab-btn ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {/* ===== OFFRES ===== */}
      {tab === 'offres' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'var(--navy)' }}>Vos besoins ({mesOffres.length})</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowOffreForm(!showOffreForm)}>+ Publier un besoin</button>
          </div>
          {showOffreForm && (
            <div className={`card ${styles.offreForm}`}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16 }}>Décrire un nouveau besoin</h4>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Intitulé du poste</label><input className="form-input" placeholder="Ex: Téléconseiller bilingue" value={newOffre.titre} onChange={e => setNewOffre({ ...newOffre, titre: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Type de mission</label>
                  <select className="form-select" value={newOffre.typeMission} onChange={e => setNewOffre({ ...newOffre, typeMission: e.target.value })}>
                    {['Intérim', 'Management de Transition', 'Pré-embauche'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nombre de profils</label><input className="form-input" type="number" min="1" value={newOffre.nbProfils} onChange={e => setNewOffre({ ...newOffre, nbProfils: +e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Date de démarrage</label><input className="form-input" type="date" /></div>
              </div>
              <div className="form-group"><label className="form-label">Description du poste</label><textarea className="form-textarea" placeholder="Décrivez les missions et compétences requises…" value={newOffre.description} onChange={e => setNewOffre({ ...newOffre, description: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" onClick={handleAddOffre}>Publier l'offre</button>
                <button className="btn btn-ghost" onClick={() => setShowOffreForm(false)}>Annuler</button>
              </div>
            </div>
          )}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Titre</th><th>Type</th><th>Statut</th><th>Candidatures</th><th>Date</th></tr></thead>
              <tbody>
                {mesOffres.length === 0
                  ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>Aucun besoin publié pour l'instant.</td></tr>
                  : mesOffres.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{o.titre}</td>
                      <td><span className="badge badge-blue">{o.typeMission}</span></td>
                      <td><span className={`status-dot ${o.statut === 'Ouverte' || o.statut === 'Publiée' ? 'status-green' : 'status-orange'}`}>{o.statut}</span></td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => setTab('candidatures')}>
                          {(o.candidaturesIds || []).length} candidature{(o.candidaturesIds || []).length !== 1 ? 's' : ''}
                        </button>
                      </td>
                      <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{o.datePublication}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== CANDIDATURES REÇUES ===== */}
      {tab === 'candidatures' && (
        <div>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>
            Candidatures reçues ({allCandidaturesIds.length})
          </h3>
          {allCandidaturesDetails.length === 0 ? (
            <div className={styles.emptyState}>
              <span style={{ fontSize: '2.5rem' }}>📥</span>
              <p>Aucune candidature reçue pour l'instant. Publiez une offre pour commencer à recevoir des candidatures.</p>
            </div>
          ) : (
            allCandidaturesDetails.map(({ candidat: c, offres: covs }) => (
              <CandidatCard
                key={c.id}
                candidat={c}
                offresLabel={covs.map(o => o.titre).join(', ')}
                onRetenir={(offreId) => selectionnerCandidat(offreId, c.id, 'retenu')}
                onRefuser={(offreId) => selectionnerCandidat(offreId, c.id, 'refusé')}
                offres={covs}
                onContact={() => setSelectedCandidat(c)}
              />
            ))
          )}
        </div>
      )}

      {/* ===== PARCOURIR LES CANDIDATS ===== */}
      {tab === 'parcourir' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <input className="form-input" placeholder="🔍 Rechercher par nom, secteur, poste, CRM…"
              value={candidatFilter} onChange={e => setCandidatFilter(e.target.value)}
              style={{ maxWidth: 400 }} />
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{filteredCandidats.length} profil{filteredCandidats.length !== 1 ? 's' : ''}</span>
          </div>
          {filteredCandidats.length === 0 ? (
            <div className={styles.emptyState}><p>Aucun profil correspondant.</p></div>
          ) : (
            <div className={styles.candidatsGrid}>
              {filteredCandidats.map(c => (
                <CandidatBrowseCard key={c.id} candidat={c} onContact={() => setSelectedCandidat(c)} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== COMPTE ===== */}
      {tab === 'compte' && (
        <div className={`card ${styles.compteCard}`}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, marginBottom: 20 }}>Informations du compte</h3>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Raison sociale</label><input className="form-input" defaultValue={entreprise.raisonSociale} /></div>
            <div className="form-group"><label className="form-label">Secteur</label><input className="form-input" defaultValue={entreprise.secteur} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Contact principal</label><input className="form-input" defaultValue={entreprise.contact} /></div>
            <div className="form-group"><label className="form-label">Fonction</label><input className="form-input" defaultValue={entreprise.fonction} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue={entreprise.email} /></div>
            <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" defaultValue={entreprise.telephone} /></div>
          </div>
          <div className={styles.abonnInfo}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--navy)' }}>Plan actuel : {entreprise.abonnement}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.83rem', marginTop: 4 }}>{abonnement?.prix}</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/abonnements')}>Changer de plan</button>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Modifications enregistrées !')}>Enregistrer</button>
        </div>
      )}

      {/* ===== SUPPORT STC ===== */}
      {tab === 'messages' && (
        <div className={styles.messaging}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Échanges avec STC
          </div>
          <div className={styles.msgBody}>
            {mesMessages.map(m => (
              <div key={m.id} className={`${styles.msgRow} ${m.from === 'entreprise' ? styles.msgMe : styles.msgThem}`}>
                <div className={styles.msgBubble}>{m.text}</div>
                <div className={styles.msgTime}>{m.date}</div>
              </div>
            ))}
            {mesMessages.length === 0 && <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: 24, fontSize: '0.88rem' }}>Aucun message pour le moment.</p>}
          </div>
          <div className={styles.msgFooter}>
            <input className={styles.msgInput} placeholder="Votre message…" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMsg()} />
            <button className="btn btn-primary btn-sm" onClick={handleSendMsg}>Envoyer →</button>
          </div>
        </div>
      )}

      {/* ===== MODAL CONTACT DIRECT CANDIDAT ===== */}
      {selectedCandidat && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedCandidat(null)}>
          <div className="modal-box" style={{ maxWidth: 520 }}>
            <button className="modal-close" onClick={() => setSelectedCandidat(null)}>✕</button>
            <h3 className="modal-title">💬 Contacter {selectedCandidat.prenom} {selectedCandidat.nom}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 16 }}>
              Envoyez un message direct à ce candidat.
            </p>
            <div className={styles.msgBody} style={{ maxHeight: 200, marginBottom: 12 }}>
              {getDirectMessages(selectedCandidat.id).map(m => (
                <div key={m.id} className={`${styles.msgRow} ${m.from === 'entreprise' ? styles.msgMe : styles.msgThem}`}>
                  <div className={styles.msgBubble}>{m.text}</div>
                  <div className={styles.msgTime}>{m.date}</div>
                </div>
              ))}
              {getDirectMessages(selectedCandidat.id).length === 0 && (
                <p style={{ color: 'var(--muted)', textAlign: 'center', fontSize: '0.85rem' }}>Commencez la conversation…</p>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" placeholder="Votre message…" value={directMsg}
                onChange={e => setDirectMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendDirectMsg()} />
              <button className="btn btn-primary btn-sm" onClick={handleSendDirectMsg}>→</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CandidatCard({ candidat: c, offresLabel, offres, onRetenir, onRefuser, onContact }) {
  const [expanded, setExpanded] = useState(false);
  const candidatureStatut = c.candidatures?.find(cv => offres.some(o => o.id === cv.offreId))?.statut;

  return (
    <div className={styles.candidatProposeCard} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <div className={styles.cpInfo}>
          <div className={styles.cpAvatar}>{c.prenom[0]}{c.nom[0]}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)' }}>{c.prenom} {c.nom}</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>Pour : {offresLabel}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {candidatureStatut && (
            <span className={`status-dot ${candidatureStatut === 'Retenu' ? 'status-green' : candidatureStatut === 'Refusé' ? 'status-red' : 'status-orange'}`}>
              {candidatureStatut}
            </span>
          )}
          <div className={styles.scoreChip} style={{ background: c.scoreTest >= 80 ? 'var(--success-bg)' : 'var(--warning-bg)', color: c.scoreTest >= 80 ? '#065F46' : '#92400E' }}>
            {c.scoreTest}/100
          </div>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <div className="grid-2" style={{ marginBottom: 12 }}>
            {[['📧', c.email], ['📞', c.telephone], ['🎓', c.niveauEtudes], ['⏱', c.anneesGRC + ' exp. GRC'], ['🌍', c.langues?.join(', ')], ['📍', c.disponibilite]].map(([ico, v]) => (
              <div key={ico} style={{ background: 'var(--bg)', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{ico}</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outils CRM :</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {c.outilsCRM?.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {offres.map(o => (
              <div key={o.id} style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-success btn-sm" onClick={() => onRetenir(o.id)}>✓ Retenir</button>
                <button className="btn btn-ghost btn-sm" onClick={() => onRefuser(o.id)}>✗ Refuser</button>
              </div>
            ))}
            <button className="btn btn-outline btn-sm" onClick={onContact}>💬 Contacter</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CandidatBrowseCard({ candidat: c, onContact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.candidatBrowseCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className={styles.cpAvatar} style={{ width: 44, height: 44, fontSize: '1rem' }}>{c.prenom[0]}{c.nom[0]}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)' }}>{c.prenom} {c.nom}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{c.postes?.slice(0, 2).join(' · ')}</div>
          </div>
        </div>
        <div className={styles.scoreChip} style={{ background: c.scoreTest >= 80 ? 'var(--success-bg)' : 'var(--warning-bg)', color: c.scoreTest >= 80 ? '#065F46' : '#92400E' }}>
          {c.scoreTest}/100
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {c.secteurs?.slice(0, 2).map(s => <span key={s} className="badge badge-blue">{s}</span>)}
        <span className="badge badge-gray">{c.disponibilite}</span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {c.outilsCRM?.slice(0, 3).map(t => <span key={t} style={{ fontSize: '0.72rem', background: '#f5f5f5', color: '#555', padding: '2px 8px', borderRadius: 20 }}>{t}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-outline btn-sm" onClick={() => setExpanded(!expanded)}>{expanded ? 'Moins' : 'Voir profil'}</button>
        <button className="btn btn-primary btn-sm" onClick={onContact}>💬 Contacter</button>
      </div>
      {expanded && (
        <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <div className="grid-2" style={{ gap: 8 }}>
            {[['🎓', c.niveauEtudes], ['⏱', c.anneesGRC + ' GRC'], ['🌍', c.langues?.join(', ')], ['💰', c.pretentions], ['🏠', c.teletravail], ['📍', c.mobilite?.join(', ')]].map(([ico, v]) => (
              <div key={ico} style={{ background: 'var(--bg)', borderRadius: 8, padding: '7px 10px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{ico}</div>
                <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
