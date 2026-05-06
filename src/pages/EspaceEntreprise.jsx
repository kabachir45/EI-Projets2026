import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { abonnements } from '../mock/mockData';
import styles from './EspaceEntreprise.module.css';

export default function EspaceEntreprise() {
  const { user } = useAuth();
  const { entreprises, offres, candidats, messages, sendMessage, addOffre } = useData();
  const navigate = useNavigate();
  const [tab, setTab] = useState('compte');
  const [newMsg, setNewMsg] = useState('');
  const [showOffreForm, setShowOffreForm] = useState(false);
  const [newOffre, setNewOffre] = useState({ titre: '', typeMission: 'Intérim', nbProfils: 1, description: '' });

  if (!user || user.role !== 'entreprise') {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', marginBottom: 12 }}>Accès réservé aux entreprises</h2>
        <button className="btn btn-primary" onClick={() => navigate('/connexion')}>Se connecter</button>
      </div>
    );
  }

  const entreprise = entreprises.find(e => e.id === user.entrepriseId);
  if (!entreprise) return null;

  const mesOffres = offres.filter(o => o.entrepriseId === entreprise.id);
  const mesMessages = messages[entreprise.id] || [];
  const abonnement = abonnements.find(a => a.id.toLowerCase() === (entreprise.abonnement || 'starter').toLowerCase());

  const candidatsProposesMap = {};
  mesOffres.forEach(o => {
    (o.candidatsProposesIds || []).forEach(cid => {
      if (!candidatsProposesMap[o.id]) candidatsProposesMap[o.id] = [];
      const c = candidats.find(c => c.id === cid);
      if (c) candidatsProposesMap[o.id].push(c);
    });
  });

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

      <div className="tabs">
        {[['compte', '🏢 Mon Compte'], ['offres', '📋 Mes Besoins'], ['candidats', '👤 Profils proposés'], ['messages', '💬 Échanges']].map(([k, l]) => (
          <button key={k} className={`tab-btn ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

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
          <button className="btn btn-primary" onClick={() => alert('Modifications enregistrées !')}>Enregistrer les modifications</button>
        </div>
      )}

      {tab === 'offres' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'var(--navy)' }}>Besoins soumis ({mesOffres.length})</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowOffreForm(!showOffreForm)}>+ Nouveau besoin</button>
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
                <button className="btn btn-primary" onClick={handleAddOffre}>Envoyer pour validation</button>
                <button className="btn btn-ghost" onClick={() => setShowOffreForm(false)}>Annuler</button>
              </div>
              <div className="alert alert-info" style={{ marginTop: 12 }}>Notre équipe validera votre besoin sous 24h et vous proposera des profils sous 48h.</div>
            </div>
          )}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Titre</th><th>Type</th><th>Statut</th><th>Profils</th><th>Date</th></tr></thead>
              <tbody>
                {mesOffres.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>Aucun besoin soumis pour l'instant.</td></tr>
                  : mesOffres.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{o.titre}</td>
                      <td><span className="badge badge-blue">{o.typeMission}</span></td>
                      <td><span className={`status-dot ${o.statut === 'Publiée' ? 'status-green' : 'status-orange'}`}>{o.statut}</span></td>
                      <td>{o.nbProfils}</td>
                      <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{o.datePublication}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'candidats' && (
        <div>
          {mesOffres.every(o => !candidatsProposesMap[o.id]?.length) ? (
            <div className={styles.emptyState}>
              <span style={{ fontSize: '2.5rem' }}>👤</span>
              <p>Aucun profil proposé pour le moment. Notre équipe travaille à identifier les meilleurs candidats pour vos besoins.</p>
            </div>
          ) : (
            mesOffres.map(o => {
              const props = candidatsProposesMap[o.id] || [];
              if (!props.length) return null;
              return (
                <div key={o.id} className={styles.offreGroup}>
                  <h4 className={styles.offreGroupTitle}>📋 {o.titre} <span className="badge badge-blue">{props.length} profil{props.length > 1 ? 's' : ''}</span></h4>
                  {props.map(c => (
                    <CandidatPropose key={c.id} candidat={c} />
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}

      {tab === 'messages' && (
        <div className={styles.messaging}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Échanges avec STC
          </div>
          <div className={styles.msgBody} id="msg-body-ent">
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
    </div>
  );
}

function CandidatPropose({ candidat }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.candidatProposeCard} onClick={() => setShowModal(true)}>
        <div className={styles.cpInfo}>
          <div className={styles.cpAvatar}>{candidat.prenom[0]}{candidat.nom[0]}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)' }}>{candidat.prenom} {candidat.nom}</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{candidat.secteurs?.join(', ')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className={styles.scoreChip} style={{ background: candidat.scoreTest >= 80 ? 'var(--success-bg)' : 'var(--warning-bg)', color: candidat.scoreTest >= 80 ? '#065F46' : '#92400E' }}>
            {candidat.scoreTest}/100
          </div>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Voir le profil →</span>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="modal-title">{candidat.prenom} {candidat.nom}</div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              {[['📧', candidat.email], ['📞', candidat.telephone], ['🎓', candidat.niveauEtudes], ['⏱', candidat.anneesGRC + ' en GRC'], ['🌍', candidat.langues?.join(', ')], ['📍', candidat.disponibilite]].map(([i, v]) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{i}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 8 }}>Outils CRM maîtrisés</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {candidat.outilsCRM?.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-success btn-sm" onClick={() => { alert('Profil retenu !'); setShowModal(false); }}>✓ Retenir ce profil</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { alert('Refus enregistré.'); setShowModal(false); }}>✗ Refuser</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
