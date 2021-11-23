import { useState } from 'react';
import { useParams } from 'react-router';

import Experiences from '../components/Experiences';
import Search from '../components/Search';
import { useExperiences } from '../hooks/useExperiences';
import { useNavigate } from "react-router";
import { notify } from '../services/Utils';

function ExperiencesPage() {

  const { search } = useParams();
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const { loading, experiences } = useExperiences({ keyword: search, uid: authUser.uid })
  let navigate = useNavigate();

  const handleSubmit = ({ keyword }) => {
    navigate(`/experiences/${keyword}`)
    notify('Buscando...')
  }

  return (
    <>
      <h1 className="title">Lista de experiencias</h1>
      <Search onSubmit={handleSubmit} />
      {loading ? <div>Cargando</div> : <Experiences experiences={experiences} />}
    </>
  );
}
export default ExperiencesPage;