
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import './App.css';
import LandingPage from './pages/LandingPage';
import Navigation from './components/Navigation';
import ExperiencesPage from './pages/ExperiencesPage';
import YourExperiencesPage from './pages/YourExperiencesPage';
import FormularioPage from './pages/FormularioPage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import PerfilPage from './pages/PerfilPage';
import 'bulma/css/bulma.min.css';

function App() {

  return (
    <div>
      <React.StrictMode>

        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="experiences/:uid" element={<YourExperiencesPage />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="formulario/:id" element={<FormularioPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:uid" element={<PerfilPage />} />
          <Route path="SignIn" element={<SignInPage />} />
        </Routes>

        <Outlet></Outlet>
      </React.StrictMode>

    </div>

  );
}

export default App;