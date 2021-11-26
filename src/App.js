import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import ExperiencesPage from './pages/ExperiencesPage';
import AddExperiencePage from './pages/AddExperiencePage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import PerfilPage from './pages/PerfilPage';
import ChatPage from './pages/ChatPage';
import ReactNotification from 'react-notifications-component';
import ExperieneDetail from './pages/ExperienceDetail';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import 'bulma/css/bulma.min.css';

function App() {

  return (
    <>
      {/* TODO: No mostrar navbar si el usuario no está logueado */}
      <Navigation />
      <div className="app-container">
        <ReactNotification />
        <React.StrictMode>
          {/* TODO: Arreglar routing, de cara a que si el usuario no esta logueado, 
          lo redireccione siempre a 'login'*/}
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="experiences/" element={<ExperiencesPage />} />
            <Route path="experiences/:search" element={<ExperiencesPage />} />
            <Route path="experience/:id" element={<ExperieneDetail />} />
            <Route path="addExperience" element={<AddExperiencePage />} />
            <Route path="addExperience/:id" element={<AddExperiencePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:uid" element={<PerfilPage />} />
            <Route path="chat/:uid1/:uid2" element={<ChatPage />} />
            <Route path="home" element={<LandingPage />} />
            <Route path="login" element={<SignInPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.StrictMode>
      </div>
      </>
  );
}

export default App;
