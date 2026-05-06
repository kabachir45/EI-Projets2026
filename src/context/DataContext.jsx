import { createContext, useContext, useState } from 'react';
import {
  candidats as initCandidats,
  entreprises as initEntreprises,
  offres as initOffres,
  formations as initFormations,
  missions as initMissions,
  messagesInit,
} from '../mock/mockData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [candidats, setCandidats] = useState(initCandidats);
  const [entreprises, setEntreprises] = useState(initEntreprises);
  const [offres, setOffres] = useState(initOffres);
  const [formations, setFormations] = useState(initFormations);
  const [missions] = useState(initMissions);
  const [messages, setMessages] = useState(messagesInit);
  const [testResults, setTestResults] = useState({});

  // --- CANDIDATS ---
  const updateCandidatStatut = (id, statut) => {
    setCandidats(prev => prev.map(c => c.id === id ? { ...c, statut } : c));
  };

  const updateCandidatProfil = (id, updates) => {
    setCandidats(prev => prev.map(c => c.id === id ? { ...c, ...updates, profilComplet: false } : c));
  };

  const saveTestResult = (candidatId, testId, score) => {
    setTestResults(prev => ({ ...prev, [`${candidatId}_${testId}`]: score }));
  };

  // --- ENTREPRISES ---
  const updateEntrepriseStatut = (id, statut) => {
    setEntreprises(prev => prev.map(e => e.id === id ? { ...e, statut } : e));
  };

  // --- OFFRES ---
  const updateOffreStatut = (id, statut) => {
    setOffres(prev => prev.map(o => o.id === id ? { ...o, statut } : o));
  };

  const addOffre = (offre) => {
    const newId = Math.max(0, ...offres.map(o => o.id)) + 1;
    setOffres(prev => [...prev, {
      ...offre, id: newId,
      statut: 'Ouverte',
      datePublication: new Date().toISOString().split('T')[0],
      candidatsProposesIds: [],
      candidaturesIds: [],
    }]);
  };

  const proposerCandidatAEntreprise = (offreId, candidatId) => {
    setOffres(prev => prev.map(o => o.id === offreId
      ? { ...o, candidatsProposesIds: [...(o.candidatsProposesIds || []), candidatId] }
      : o
    ));
  };

  // DIRECT: Candidat postule directement à une offre (sans passer par l'admin)
  const postulerOffre = (offreId, candidatId) => {
    // Add to offre's candidaturesIds
    setOffres(prev => prev.map(o => {
      if (o.id !== offreId) return o;
      if ((o.candidaturesIds || []).includes(candidatId)) return o;
      return { ...o, candidaturesIds: [...(o.candidaturesIds || []), candidatId] };
    }));
    // Add to candidat's candidatures
    const offre = offres.find(o => o.id === offreId);
    setCandidats(prev => prev.map(c => {
      if (c.id !== candidatId) return c;
      if ((c.candidatures || []).find(x => x.offreId === offreId)) return c;
      return {
        ...c,
        candidatures: [...(c.candidatures || []), {
          offreId,
          entreprise: offre?.entreprise || '',
          date: new Date().toISOString().split('T')[0],
          statut: 'En cours',
        }],
      };
    }));
  };

  // DIRECT: Entreprise sélectionne un candidat depuis une offre (sans passer par l'admin)
  const selectionnerCandidat = (offreId, candidatId, action) => {
    // action: 'retenu' | 'refusé'
    setCandidats(prev => prev.map(c => {
      if (c.id !== candidatId) return c;
      return {
        ...c,
        candidatures: (c.candidatures || []).map(cv =>
          cv.offreId === offreId
            ? { ...cv, statut: action === 'retenu' ? 'Retenu' : 'Refusé' }
            : cv
        ),
      };
    }));
    // If retained, add to candidatsProposesIds as well for visibility
    if (action === 'retenu') {
      setOffres(prev => prev.map(o => {
        if (o.id !== offreId) return o;
        if ((o.candidatsProposesIds || []).includes(candidatId)) return o;
        return { ...o, candidatsProposesIds: [...(o.candidatsProposesIds || []), candidatId] };
      }));
    }
  };

  // DIRECT: Entreprise contacte un candidat via message
  const envoyerMessageEntrepriseCandidatKey = (entrepriseId, candidatId) =>
    `ent_${entrepriseId}_cand_${candidatId}`;

  const sendDirectMessage = (fromId, toId, text, fromRole) => {
    const key = fromRole === 'entreprise'
      ? envoyerMessageEntrepriseCandidatKey(fromId, toId)
      : envoyerMessageEntrepriseCandidatKey(toId, fromId);
    setMessages(prev => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id: Date.now(),
          from: fromRole,
          fromId,
          text,
          date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' aujourd\'hui',
        },
      ],
    }));
  };

  // --- FORMATIONS ---
  const accepterFormation = (candidatId, formationId) => {
    setCandidats(prev => prev.map(c => {
      if (c.id !== candidatId) return c;
      const formations = c.formations.map(f =>
        f.id === formationId ? { ...f, statut: 'Acceptée' } : f
      );
      return { ...c, formations };
    }));
  };

  const refuserFormation = (candidatId, formationId) => {
    setCandidats(prev => prev.map(c => {
      if (c.id !== candidatId) return c;
      const formations = c.formations.map(f =>
        f.id === formationId ? { ...f, statut: 'Refusée' } : f
      );
      return { ...c, formations };
    }));
  };

  const proposerFormation = (candidatId, formationId) => {
    const form = formations.find(f => f.id === formationId);
    if (!form) return;
    setCandidats(prev => prev.map(c => {
      if (c.id !== candidatId) return c;
      const already = c.formations.find(f => f.id === formationId);
      if (already) return c;
      return { ...c, formations: [...c.formations, { id: formationId, titre: form.titre, statut: 'En attente', date: form.date }] };
    }));
  };

  // --- MESSAGES (admin/entreprise via STC) ---
  const sendMessage = (entrepriseId, text, from = 'admin') => {
    setMessages(prev => ({
      ...prev,
      [entrepriseId]: [
        ...(prev[entrepriseId] || []),
        { id: Date.now(), from, text, date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' aujourd\'hui' },
      ],
    }));
  };

  // --- REGISTRATION HELPERS ---
  const addCandidatFromRegistration = ({ id, prenom, nom, email, telephone }) => {
    setCandidats(prev => {
      if (prev.find(c => c.id === id)) return prev; // already exists
      return [...prev, {
        id,
        prenom: prenom || '',
        nom: nom || '',
        email: email || '',
        telephone: telephone || '',
        ville: 'Dakar', quartier: '', niveauEtudes: '',
        specialite: '', dateNaissance: '', sexe: '',
        anneesExperience: '', anneesGRC: '',
        secteurs: [], postes: [], typesMissions: [], outilsCRM: [],
        excel: '', word: '', vitesseFrappe: '',
        langues: [], francaisOral: '', francaisEcrit: '',
        anglaisOral: '', anglaisEcrit: '',
        disponibilite: 'Immédiate', typeContrat: [], dureeMission: [],
        mobilite: [], teletravail: '',
        pretentions: '',
        scoreTest: 0, statut: 'Nouveau',
        dateInscription: new Date().toISOString().split('T')[0],
        profilComplet: false, cvUploaded: false,
        formations: [], candidatures: [],
      }];
    });
  };

  const addEntrepriseFromRegistration = ({ id, societe, secteur, email, telephone }) => {
    setEntreprises(prev => {
      if (prev.find(e => e.id === id)) return prev;
      return [...prev, {
        id,
        raisonSociale: societe || '',
        secteur: secteur || '',
        email: email || '',
        telephone: telephone || '',
        contact: '',
        fonction: '',
        abonnement: 'Starter',
        statut: 'Actif',
        dateInscription: new Date().toISOString().split('T')[0],
      }];
    });
  };

  return (
    <DataContext.Provider value={{
      candidats, entreprises, offres, formations, missions, messages, testResults,
      updateCandidatStatut, updateCandidatProfil, saveTestResult,
      updateEntrepriseStatut, updateOffreStatut, addOffre, proposerCandidatAEntreprise,
      accepterFormation, refuserFormation, proposerFormation, sendMessage,
      postulerOffre, selectionnerCandidat, sendDirectMessage,
      envoyerMessageEntrepriseCandidatKey,
      addCandidatFromRegistration, addEntrepriseFromRegistration,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
