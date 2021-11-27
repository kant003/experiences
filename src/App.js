import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import ExperiencesPage from './pages/ExperiencesPage';
import AddExperiencePage from './pages/AddExperiencePage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import PerfilPage from './pages/PerfilPage';
import ChatPage from './pages/ChatPage';
import ReactNotification from 'react-notifications-component'; import ExperieneDetail from './pages/ExperienceDetail'; import Private from './components/Private';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import 'bulma/css/bulma.min.css';

function App() {
  const [user, _] = useState(JSON.parse(localStorage.getItem('authUser')));

  return (
    <>
      {/* TODO: BUG, Si no refrescas la página, no aparece la navbar */}
      {user && <Navigation />}
      <div className="app-container">
        <ReactNotification />
        <React.StrictMode>
          <Routes>
            <Route path="/" element={
              <Private>
                <SignInPage />
              </Private>
            } />
            <Route path="experiences/" element={
              <Private>
                <ExperiencesPage />
              </Private>
            } />
            <Route path="experiences/:search" element={
              <Private>
                <ExperiencesPage />
              </Private>
            } />
            <Route path="experience/:id" element={
              <Private>
                <ExperieneDetail />
              </Private>
            } />
            <Route path="addExperience" element={
              <Private>
                <AddExperiencePage />
              </Private>
            } />
            <Route path="addExperience/:id" element={
              <Private>
                <AddExperiencePage />
              </Private>
            } />
            <Route path="users" element={
              <Private>
                <UsersPage />
              </Private>
            } />
            <Route path="users/:uid" element={
              <Private>
                <PerfilPage />
              </Private>
            } />
            <Route path="chat/:uid1/:uid2" element={
              <Private>
                <ChatPage />
              </Private>
            } />
            <Route path="home" element={
              <Private>
                <ExperiencesPage />
              </Private>
            } />
            <Route path="login" element={<SignInPage />} />
            <Route path="*" element={
              <Private>
                <NotFound />
              </Private>
            } />
          </Routes>
        </React.StrictMode>
      </div>
      </>
  );
}

export default App;
