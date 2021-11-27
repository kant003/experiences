import Experiences from '../components/Experiences';
import Search from '../components/Search';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useExperiences } from '../hooks/useExperiences';
import { useNavigate } from "react-router";
import { notify } from '../services/Utils';

function ExperiencesPage() {
  const { search } = useParams();
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const { loading, experiences } = useExperiences({ keyword: search, uid: authUser.uid })
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = ({ keyword }) => {
    navigate(`/experiences/${keyword}`)
    notify('Buscando...')
  }

  return (
    <>
      {location.pathname !== "/home/" && <Search onSubmit={handleSubmit} />}
      {loading ? <div>Cargando</div> : <Experiences experiences={experiences} />}
    </>
  );
}

export default ExperiencesPage;
