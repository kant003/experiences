

import { Routes, Route } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import './App.css';
import LandingPage from './pages/LandingPage';
import Navigation from './components/Navigation';
import ExperiencesPage from './pages/ExperiencesPage';
import FormularioPage from './pages/FormularioPage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import 'bulma/css/bulma.min.css';


function App() {


  

  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="experiences" element={<ExperiencesPage />} />
        <Route path="formulario" element={<FormularioPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="SignIn" element={<SignInPage />} />
      </Routes>
      <Outlet></Outlet>
    </div>

  );
}

export default App;