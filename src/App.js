import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';
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
import 'react-notifications-component/dist/theme.css';

import 'bulma/css/bulma.min.css';
import ExperieneDetail from './pages/ExperienceDetail';

function App() {
  const [usingEthereum, setUsingEthereum] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') setUsingEthereum(true);
  }, []);

  return (
    <div className="app-container">
      <ReactNotification />
      <React.StrictMode>
        <Navigation usingEthereum={usingEthereum}></Navigation>

        <Routes>
          {/* <Route path="/" element={<Navigate to={'/home/' + authUser.uid} />} /> */}
          <Route path="/" element={<SignInPage />} />
          <Route path="experiences/" element={<ExperiencesPage />} />
          <Route path="experiences/:search" element={<ExperiencesPage />} />
          <Route path="experience/:id" element={<ExperieneDetail />} />
          <Route path="addExperience" element={<AddExperiencePage />} />
          <Route path="addExperience/:id" element={<AddExperiencePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:uid" element={<PerfilPage />} />
          <Route path="chat/:uid1/:uid2" element={<ChatPage />} />
          <Route path="home" element={<LandingPage usingEthereum={usingEthereum} />} />
          <Route path="SignIn" element={<SignInPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.StrictMode>
    </div>
  );
}

export default App;
