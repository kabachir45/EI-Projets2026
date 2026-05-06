// ============================================================
// mockData.js — Sunu Training Center
// Base de données simulée — usage interne prototype
// ============================================================

// --- USERS (auth simulée) ---
export const users = [
  { id: 'u1', email: 'fatou@sunutrainingcenter.sn',    password: '1234', role: 'candidat',   nom: 'Fatou Diallo',    candidatId: 1 },
  { id: 'u2', email: 'moussa@sunutrainingcenter.sn',   password: '1234', role: 'candidat',   nom: 'Moussa Sow',      candidatId: 2 },
  { id: 'u3', email: 'aissatou@sunutrainingcenter.sn', password: '1234', role: 'candidat',   nom: 'Aïssatou Ba',     candidatId: 3 },
  { id: 'u4', email: 'ibrahima@sunutrainingcenter.sn', password: '1234', role: 'candidat',   nom: 'Ibrahima Fall',   candidatId: 4 },
  { id: 'u5', email: 'mariama@sunutrainingcenter.sn',  password: '1234', role: 'candidat',   nom: 'Mariama Diop',    candidatId: 5 },
  { id: 'u6', email: 'orange@sunutrainingcenter.sn',   password: '1234', role: 'entreprise', nom: 'Orange Sénégal',  entrepriseId: 2 },
  { id: 'u7', email: 'concentrix@sunutrainingcenter.sn',password:'1234', role: 'entreprise', nom: 'Concentrix',      entrepriseId: 1 },
  { id: 'u8', email: 'admin@sunutrainingcenter.sn',    password: 'admin', role: 'admin',     nom: 'Admin STC' },
];

// --- CANDIDATS ---
export const candidats = [
  {
    id: 1, prenom: 'Fatou', nom: 'Diallo',
    email: 'fatou.diallo@email.com', telephone: '+221 77 123 45 67',
    ville: 'Dakar', quartier: 'Almadies', niveauEtudes: 'BAC+3',
    specialite: 'Commerce International', dateNaissance: '1998-03-12', sexe: 'Femme',
    anneesExperience: '3-5 ans', anneesGRC: '3-5 ans',
    secteurs: ["BPO/Centre d'appels", 'Télécoms'],
    postes: ['Téléconseiller', 'Team Leader'],
    typesMissions: ['Service entrant', 'Rétention'],
    outilsCRM: ['Zendesk', 'HubSpot'],
    excel: 'Intermédiaire', word: 'Avancé', vitesseFrappe: '50-70 mots/min',
    langues: ['Français', 'Anglais', 'Wolof'],
    francaisOral: 'Bilingue', francaisEcrit: 'Bilingue',
    anglaisOral: 'Intermédiaire', anglaisEcrit: 'Intermédiaire',
    disponibilite: 'Immédiate', typeContrat: ['Intérim', 'CDI'],
    dureeMission: ['3-6 mois', '6-12 mois'],
    mobilite: ['Dakar uniquement'], teletravail: 'Hybride',
    pretentions: '200-350k FCFA',
    scoreTest: 82, statut: 'Présélectionné',
    dateInscription: '2026-04-10',
    profilComplet: true, cvUploaded: true,
    formations: [{ id: 1, titre: 'Management équipe GRC', statut: 'Acceptée', date: '2026-05-10' }],
    candidatures: [
      { offreId: 1, entreprise: 'Concentrix Sénégal', date: '2026-05-02', statut: 'En cours' },
      { offreId: 2, entreprise: 'Orange Sénégal', date: '2026-04-28', statut: 'Retenu' },
    ],
  },
  {
    id: 2, prenom: 'Moussa', nom: 'Sow',
    email: 'moussa.sow@email.com', telephone: '+221 76 987 65 43',
    ville: 'Dakar', quartier: 'Plateau', niveauEtudes: 'BAC+2',
    specialite: 'Gestion', dateNaissance: '2000-07-22', sexe: 'Homme',
    anneesExperience: '1-2 ans', anneesGRC: '1-2 ans',
    secteurs: ['Banque', 'Fintech'],
    postes: ['Téléconseiller', 'Chargé de clientèle'],
    typesMissions: ['Service entrant', 'Vente'],
    outilsCRM: ['Salesforce'],
    excel: 'Débutant', word: 'Intermédiaire', vitesseFrappe: '30-50 mots/min',
    langues: ['Français', 'Wolof'],
    francaisOral: 'Courant', francaisEcrit: 'Courant',
    anglaisOral: 'Débutant', anglaisEcrit: 'Débutant',
    disponibilite: 'Dans 15 jours', typeContrat: ['Intérim'],
    dureeMission: ['1-3 mois', '3-6 mois'],
    mobilite: ['Dakar uniquement', 'Région Dakar'], teletravail: 'Non',
    pretentions: '100-200k FCFA',
    scoreTest: 65, statut: 'Nouveau',
    dateInscription: '2026-04-22',
    profilComplet: false, cvUploaded: true,
    formations: [],
    candidatures: [],
  },
  {
    id: 3, prenom: 'Aïssatou', nom: 'Ba',
    email: 'aissatou.ba@email.com', telephone: '+221 78 456 78 90',
    ville: 'Dakar', quartier: 'VDN', niveauEtudes: 'BAC+5',
    specialite: 'Management', dateNaissance: '1994-11-05', sexe: 'Femme',
    anneesExperience: '5-10 ans', anneesGRC: '5-10 ans',
    secteurs: ["BPO/Centre d'appels", 'Télécoms', 'Banque'],
    postes: ['Superviseur', 'Formateur GRC'],
    typesMissions: ['Service entrant', 'Service sortant', 'Support technique'],
    outilsCRM: ['Salesforce', 'Zendesk', 'HubSpot'],
    excel: 'Avancé', word: 'Avancé', vitesseFrappe: '+70 mots/min',
    langues: ['Français', 'Anglais', 'Wolof'],
    francaisOral: 'Bilingue', francaisEcrit: 'Bilingue',
    anglaisOral: 'Courant', anglaisEcrit: 'Courant',
    disponibilite: 'En poste, ouvert aux opportunités',
    typeContrat: ['Management de transition'],
    dureeMission: ['6-12 mois', '+12 mois'],
    mobilite: ['Dakar uniquement', 'Région Dakar', 'Tout le Sénégal'], teletravail: 'Hybride',
    pretentions: '+500k FCFA',
    scoreTest: 91, statut: 'Validé',
    dateInscription: '2026-03-15',
    profilComplet: true, cvUploaded: true,
    formations: [
      { id: 2, titre: 'Coaching & Leadership GRC', statut: 'En attente', date: '2026-05-15' },
    ],
    candidatures: [],
  },
  {
    id: 4, prenom: 'Ibrahima', nom: 'Fall',
    email: 'ibrahima.fall@email.com', telephone: '+221 77 234 56 78',
    ville: 'Dakar', quartier: 'Parcelles Assainies', niveauEtudes: 'BAC+2',
    specialite: 'Informatique', dateNaissance: '2001-02-14', sexe: 'Homme',
    anneesExperience: '1-2 ans', anneesGRC: '1-2 ans',
    secteurs: ["BPO/Centre d'appels"],
    postes: ['Téléconseiller'],
    typesMissions: ['Support technique'],
    outilsCRM: ['Freshdesk'],
    excel: 'Intermédiaire', word: 'Intermédiaire', vitesseFrappe: '30-50 mots/min',
    langues: ['Français', 'Wolof'],
    francaisOral: 'Courant', francaisEcrit: 'Intermédiaire',
    anglaisOral: 'Débutant', anglaisEcrit: 'Débutant',
    disponibilite: 'Immédiate', typeContrat: ['Intérim', 'CDD'],
    dureeMission: ['1-3 mois', '3-6 mois'],
    mobilite: ['Dakar uniquement'], teletravail: 'Pas de préférence',
    pretentions: '<100k FCFA',
    scoreTest: 72, statut: 'Nouveau',
    dateInscription: '2026-05-01',
    profilComplet: false, cvUploaded: true,
    formations: [],
    candidatures: [],
  },
  {
    id: 5, prenom: 'Mariama', nom: 'Diop',
    email: 'mariama.diop@email.com', telephone: '+221 78 345 67 89',
    ville: 'Dakar', quartier: 'Sacré-Cœur', niveauEtudes: 'BAC+3',
    specialite: 'Finance Banque', dateNaissance: '1996-09-30', sexe: 'Femme',
    anneesExperience: '3-5 ans', anneesGRC: '3-5 ans',
    secteurs: ['Banque', 'Assurance'],
    postes: ['Chargé de clientèle', 'Back-office'],
    typesMissions: ['Service entrant', 'Recouvrement'],
    outilsCRM: ['Dynamics', 'Salesforce'],
    excel: 'Avancé', word: 'Avancé', vitesseFrappe: '50-70 mots/min',
    langues: ['Français', 'Anglais', 'Wolof', 'Arabe'],
    francaisOral: 'Bilingue', francaisEcrit: 'Bilingue',
    anglaisOral: 'Courant', anglaisEcrit: 'Courant',
    disponibilite: 'Dans 1 mois', typeContrat: ['CDI', 'Pré-embauche'],
    dureeMission: ['6-12 mois', '+12 mois'],
    mobilite: ['Dakar uniquement', 'Région Dakar', 'Tout le Sénégal', "Afrique de l'Ouest"],
    teletravail: 'Hybride', pretentions: '350-500k FCFA',
    scoreTest: 88, statut: 'Validé',
    dateInscription: '2026-04-05',
    profilComplet: true, cvUploaded: true,
    formations: [],
    candidatures: [{ offreId: 3, entreprise: 'Ecobank Sénégal', date: '2026-05-03', statut: 'En cours' }],
  },
];

// --- ENTREPRISES ---
export const entreprises = [
  {
    id: 1, raisonSociale: 'Concentrix Sénégal', secteur: "BPO/Centre d'appels",
    taille: '+500 employés', contact: 'Aminata Ndiaye', fonction: 'DRH',
    email: 'a.ndiaye@concentrix.com', telephone: '+221 33 867 00 00',
    ville: 'Dakar', statut: 'Validé', dateInscription: '2026-04-20',
    abonnement: 'Pro', offresActives: 1,
  },
  {
    id: 2, raisonSociale: 'Orange Sénégal', secteur: 'Télécoms',
    taille: '+500 employés', contact: 'Ibrahim Diop', fonction: 'Responsable RH',
    email: 'i.diop@orange.sn', telephone: '+221 33 869 00 00',
    ville: 'Dakar', statut: 'Validé', dateInscription: '2026-04-25',
    abonnement: 'Premium', offresActives: 1,
  },
  {
    id: 3, raisonSociale: 'Wave Mobile Money', secteur: 'Fintech',
    taille: '50-200 employés', contact: 'Sophie Mensah', fonction: 'Head of People',
    email: 's.mensah@wave.com', telephone: '+221 77 500 00 00',
    ville: 'Dakar', statut: 'En attente de validation', dateInscription: '2026-05-03',
    abonnement: 'Starter', offresActives: 0,
  },
  {
    id: 4, raisonSociale: 'Ecobank Sénégal', secteur: 'Banque',
    taille: '200-500 employés', contact: 'Cheikh Sarr', fonction: 'DRH',
    email: 'c.sarr@ecobank.com', telephone: '+221 33 842 00 00',
    ville: 'Dakar', statut: 'Validé', dateInscription: '2026-03-10',
    abonnement: 'Pro', offresActives: 1,
  },
];

// --- OFFRES (visibles admin uniquement) ---
export const offres = [
  {
    id: 1, titre: 'Téléconseiller bilingue FR/EN',
    entreprise: 'Concentrix Sénégal', entrepriseId: 1, secteur: "BPO/Centre d'appels",
    typeMission: 'Intérim', duree: '3-6 mois', dateDebut: '2026-06-01',
    nbProfils: 5, localisation: 'Dakar — Plateau', experienceRequise: '1-3 ans',
    niveauEtudes: 'BAC', langues: ['Français', 'Anglais'], outilsCRM: ['Zendesk'],
    description: "Prise en charge des appels entrants clients internationaux. Support technique niveau 1. Gestion des réclamations et escalades.",
    statut: 'Publiée', datePublication: '2026-04-28',
    candidatsProposesIds: [1, 4],
  },
  {
    id: 2, titre: "Superviseur centre d'appels",
    entreprise: 'Orange Sénégal', entrepriseId: 2, secteur: 'Télécoms',
    typeMission: 'Management de transition', duree: '6-12 mois', dateDebut: '2026-05-15',
    nbProfils: 1, localisation: 'Dakar — VDN', experienceRequise: '+5 ans',
    niveauEtudes: 'BAC+3', langues: ['Français'], outilsCRM: ['Salesforce'],
    description: "Supervision d'une équipe de 15 téléconseillers. Pilotage des KPIs qualité. Formation et coaching terrain.",
    statut: 'Publiée', datePublication: '2026-05-01',
    candidatsProposesIds: [3],
  },
  {
    id: 3, titre: 'Chargé de clientèle banque',
    entreprise: 'Ecobank Sénégal', entrepriseId: 4, secteur: 'Banque',
    typeMission: 'Pré-embauche', duree: '6 mois', dateDebut: '2026-06-15',
    nbProfils: 2, localisation: 'Dakar — Almadies', experienceRequise: '3-5 ans',
    niveauEtudes: 'BAC+3', langues: ['Français', 'Anglais'], outilsCRM: ['Microsoft Dynamics'],
    description: "Gestion du portefeuille clients particuliers et professionnels. Vente des produits bancaires. Fidélisation.",
    statut: 'En attente de validation', datePublication: '2026-05-04',
    candidatsProposesIds: [5],
  },
];

// --- FORMATIONS ---
export const formations = [
  {
    id: 1, titre: 'Management d\'équipe GRC',
    description: 'Techniques de management, KPIs, motivation d\'équipe dans les centres de relation client.',
    duree: '3 jours', format: 'Présentiel', niveau: 'Intermédiaire',
    date: '2026-06-10', places: 15, placesRestantes: 8,
    secteurs: ["BPO/Centre d'appels", 'Télécoms'],
    postes: ['Team Leader', 'Superviseur'],
    destinataires: [1, 3],
  },
  {
    id: 2, titre: 'Coaching & Leadership GRC',
    description: 'Développez vos compétences de leader pour guider et inspirer vos équipes GRC vers l\'excellence.',
    duree: '2 jours', format: 'Hybride', niveau: 'Avancé',
    date: '2026-06-15', places: 10, placesRestantes: 4,
    secteurs: ['Télécoms', 'Banque', "BPO/Centre d'appels"],
    postes: ['Superviseur', 'Formateur GRC'],
    destinataires: [3],
  },
  {
    id: 3, titre: 'Maîtrise Salesforce CRM',
    description: 'Formation complète sur Salesforce : configuration, rapports, automatisations et bonnes pratiques.',
    duree: '4 jours', format: 'Présentiel', niveau: 'Débutant à intermédiaire',
    date: '2026-06-22', places: 12, placesRestantes: 10,
    secteurs: ['Banque', 'Fintech', 'Télécoms'],
    postes: ['Téléconseiller', 'Chargé de clientèle', 'Back-office'],
    destinataires: [2, 4],
  },
  {
    id: 4, titre: 'Techniques de Vente & Rétention Client',
    description: 'Méthodes de vente consultative, gestion des objections, fidélisation et rétention des clients.',
    duree: '2 jours', format: 'Présentiel', niveau: 'Débutant',
    date: '2026-07-01', places: 20, placesRestantes: 15,
    secteurs: ['Banque', 'Fintech', 'Télécoms', "BPO/Centre d'appels"],
    postes: ['Téléconseiller', 'Chargé de clientèle'],
    destinataires: [2, 4, 5],
  },
];

// --- MISSIONS ---
export const missions = [
  { id: 1, candidat: 'Fatou Diallo', candidatId: 1, entreprise: 'Concentrix', entrepriseId: 1, poste: 'Téléconseiller', debut: '2026-03-01', finPrevue: '2026-08-31', statut: 'En cours' },
  { id: 2, candidat: 'Aïssatou Ba', candidatId: 3, entreprise: 'Orange SN', entrepriseId: 2, poste: 'Superviseur', debut: '2026-01-15', finPrevue: '2026-07-14', statut: 'En cours' },
  { id: 3, candidat: 'Moussa Sow', candidatId: 2, entreprise: 'Ecobank', entrepriseId: 4, poste: 'Chargé clientèle', debut: '2026-05-01', finPrevue: '2026-10-31', statut: 'En cours' },
];

// --- ABONNEMENTS ---
export const abonnements = [
  {
    id: 'starter', nom: 'Starter', prix: '150 000 FCFA/mois',
    couleur: '#27AE60',
    features: [
      '1 à 2 besoins par mois',
      'Candidats pré-qualifiés sous 72h',
      'Accès au portail entreprise',
      'Support email',
      'Remplacement garanti',
    ],
    nonInclus: ["Priorité 48h", "Accès illimité", "Account manager dédié"],
  },
  {
    id: 'pro', nom: 'Pro', prix: '350 000 FCFA/mois',
    couleur: '#0013FF', badge: 'Populaire',
    features: [
      'Jusqu\'à 10 besoins par mois',
      'Candidats qualifiés sous 48h ⚡',
      'Portail entreprise avancé',
      'Support prioritaire (email + téléphone)',
      'Remplacement garanti',
      'Rapports mensuels RH',
    ],
    nonInclus: ["Accès illimité", "Account manager dédié"],
  },
  {
    id: 'premium', nom: 'Premium', prix: '650 000 FCFA/mois',
    couleur: '#F5A623',
    features: [
      'Besoins illimités',
      'Candidats qualifiés sous 24h ⚡⚡',
      'Portail entreprise complet',
      'Account manager GRC dédié',
      'Remplacement garanti',
      'Rapports hebdomadaires + KPIs',
      'Formations incluses (2/mois)',
    ],
    nonInclus: [],
  },
];

// --- MESSAGES ---
export const messagesInit = {
  2: [
    { id: 1, from: 'entreprise', text: "Bonjour, avez-vous des profils disponibles pour notre offre de superviseur ?", date: '02/05 14:32' },
    { id: 2, from: 'admin', text: "Bonjour Ibrahim, oui nous avons 2 candidats validés. Je vous envoie leurs profils dès maintenant.", date: '03/05 09:15' },
  ],
  1: [
    { id: 1, from: 'entreprise', text: "Nous avons besoin de 5 téléconseillers bilingues pour début juin.", date: '28/04 10:00' },
    { id: 2, from: 'admin', text: "Parfait, nous avons plusieurs profils. Shortlist envoyée sous 24h.", date: '28/04 11:30' },
    { id: 3, from: 'entreprise', text: "Super, merci pour la réactivité !", date: '29/04 08:45' },
  ],
};

// --- TESTS ---
export const tests = [
  {
    id: 'ortho', titre: "Test d'orthographe", duree: '15 min', points: 30, icone: '📝',
    questions: [
      { q: "Quelle orthographe est correcte ?", opts: ["les appels téléphoniques", "les appelles téléphoniques", "les appel téléphoniques"], rep: 0 },
      { q: "Choisissez la phrase sans faute :", opts: ["Il a bien répondu au client.", "Il a bien répondu au cliant.", "Il a bien répondu aux client."], rep: 0 },
      { q: "Le pluriel correct de 'un email professionnel' :", opts: ["des emails professionels", "des emails professionnels", "des email professionnels"], rep: 1 },
    ],
  },
  {
    id: 'elocu', titre: 'Communication & Élocution', duree: '10 min', points: 25, icone: '🎤',
    questions: [
      { q: "La formule d'accueil téléphonique la plus professionnelle :", opts: ["Allô ?", "Oui, c'est quoi ?", "Bonjour, Sunu Training Center, Ibrahim à votre service, comment puis-je vous aider ?"], rep: 2 },
      { q: "Face à un client mécontent, la première étape est de :", opts: ["Lui expliquer qu'il a tort", "Écouter sans interrompre et reformuler", "Le transférer immédiatement"], rep: 1 },
      { q: "Comment gérer un client qui vous demande un remboursement non prévu ?", opts: ["Refuser catégoriquement", "Promettre sans vérifier", "Écouter, empathiser, escalader si nécessaire"], rep: 2 },
    ],
  },
  {
    id: 'office', titre: 'Maîtrise Office', duree: '20 min', points: 30, icone: '💻',
    questions: [
      { q: "Dans Excel, la formule pour faire la somme de A1 à A10 :", opts: ["=SOMME(A1:A10)", "=TOTAL(A1-A10)", "=CALCUL(A1+A10)"], rep: 0 },
      { q: "Pour créer un tableau dans Word, on va dans :", opts: ["Accueil → Styles", "Insertion → Tableau", "Mise en page → Colonnes"], rep: 1 },
      { q: "Ctrl+Z dans la plupart des applications signifie :", opts: ["Enregistrer", "Annuler", "Copier"], rep: 1 },
    ],
  },
  {
    id: 'crm', titre: 'Outils CRM', duree: '15 min', points: 15, icone: '🔧',
    questions: [
      { q: "Zendesk est principalement utilisé pour :", opts: ["La comptabilité d'entreprise", "Le support client et la gestion de tickets", "La gestion de la paie"], rep: 1 },
      { q: "Dans un CRM, un 'ticket' désigne :", opts: ["Un billet de transport", "Une demande ou réclamation client tracée", "Un bon de commande fournisseur"], rep: 1 },
      { q: "SLA signifie :", opts: ["Service Level Agreement", "Software Licensing Agreement", "Sales Lead Automation"], rep: 0 },
    ],
  },
];

// --- STATS DASHBOARD ---
export const statsAdmin = {
  candidatsTotaux: 5,
  nouveauxCetteSemaine: 2,
  entreprisesActives: 3,
  entreprisesEnAttente: 1,
  offresActives: 2,
  offresEnAttente: 1,
  missionsEnCours: 3,
  delaiMoyenReponse: '36h',
  scoreMoyenTests: 79,
  inscriptionsMois: [
    { mois: 'Jan', nb: 2 }, { mois: 'Fév', nb: 4 }, { mois: 'Mar', nb: 3 },
    { mois: 'Avr', nb: 7 }, { mois: 'Mai', nb: 5 }, { mois: 'Jun', nb: 0 },
  ],
  repartitionSecteurs: [
    { secteur: "BPO/Call Centers", pct: 40 },
    { secteur: 'Télécoms', pct: 25 },
    { secteur: 'Banque', pct: 20 },
    { secteur: 'Fintech', pct: 15 },
  ],
};
