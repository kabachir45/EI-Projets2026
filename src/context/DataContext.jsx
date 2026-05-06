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
    const newId = Math.max(...offres.map(o => o.id)) + 1;
    setOffres(prev => [...prev, { ...offre, id: newId, statut: 'En attente de validation', datePublication: new Date().toISOString().split('T')[0], candidatsProposesIds: [] }]);
  };

  const proposerCandidatAEntreprise = (offreId, candidatId) => {
    setOffres(prev => prev.map(o => o.id === offreId
      ? { ...o, candidatsProposesIds: [...(o.candidatsProposesIds || []), candidatId] }
      : o
    ));
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

  // --- MESSAGES ---
  const sendMessage = (entrepriseId, text, from = 'admin') => {
    setMessages(prev => ({
      ...prev,
      [entrepriseId]: [
        ...(prev[entrepriseId] || []),
        { id: Date.now(), from, text, date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' aujourd\'hui' },
      ],
    }));
  };

  return (
    <DataContext.Provider value={{
      candidats, entreprises, offres, formations, missions, messages, testResults,
      updateCandidatStatut, updateCandidatProfil, saveTestResult,
      updateEntrepriseStatut, updateOffreStatut, addOffre, proposerCandidatAEntreprise,
      accepterFormation, refuserFormation, proposerFormation, sendMessage,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
