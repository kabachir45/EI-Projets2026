import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Candidats from './pages/Candidats';
import Entreprises from './pages/Entreprises';
import EspaceCandidat from './pages/EspaceCandidat';
import EspaceEntreprise from './pages/EspaceEntreprise';
import Admin from './pages/Admin';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/connexion" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/connexion' || location.pathname === '/inscription';
  const showNavbar = !isAdmin;
  const showFooter = !isAdmin && !location.pathname.startsWith('/espace') && !isAuth;

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/candidats" element={<Candidats />} />
        <Route path="/entreprises" element={<Entreprises />} />
        <Route path="/espace-candidat" element={
          <ProtectedRoute role="candidat"><EspaceCandidat /></ProtectedRoute>
        } />
        <Route path="/espace-entreprise" element={
          <ProtectedRoute role="entreprise"><EspaceEntreprise /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute role="admin"><Admin /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}
