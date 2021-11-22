
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/LandingPage';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import ExperiencesPage from './pages/ExperiencesPage';
import AddExperiencePage from './pages/AddExperiencePage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import PerfilPage from './pages/PerfilPage';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


import 'bulma/css/bulma.min.css';
import ExperieneDetail from './pages/ExperienceDetail';

function App() {

  /*const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      if (user) {
        //const uid = user.uid;
        setAuthUser(user)
      } else {
        console.log('desloguado en nav')
        setAuthUser(null)
      }
    });

  }, [])*/

  return (
    <div className="app-container">
      <React.StrictMode>
        <Navigation></Navigation>

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
          <Route path="home" element={<LandingPage />} />
          <Route path="SignIn" element={<SignInPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

        <ReactNotification />

      </React.StrictMode>
    </div>
  );
}

export default App;