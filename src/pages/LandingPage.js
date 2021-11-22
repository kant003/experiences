import { useState, useEffect } from 'react';
import { getUserRef} from "../services/experiencesFirestore";
import Followers from '../components/Followers';
import Following from '../components/Following';
import { onSnapshot } from '@firebase/firestore';
import Experiences from '../components/Experiences';
import Search from '../components/Search';
import {useExperiences} from '../hooks/useExperiences';
import { useNavigate } from "react-router";
import Banners from '../components/Banners';
import { useBanners } from '../hooks/useBanners';
import { notify } from '../services/Utils';

function LandingPage() {
  const [user, setUser] = useState(null)
  const [keyword] = useState('')
  //const { uid } = useParams();
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const {loading, experiences} = useExperiences({keyword, uid:authUser.uid})
  const {loadingBanner, banners} = useBanners()
  let navigate = useNavigate();

  useEffect(() => {

    const unsub = onSnapshot(getUserRef(authUser.uid), u => setUser(u.data()) );

    return () => unsub();
  }, [keyword, authUser.uid])

  const handleSubmit = ({keyword}) => {
    navigate(`/experiences/${keyword}`)
    notify('Buscando...')
    console.log('desde padre',keyword)
}

  return (
    <>
      <div className="columns is-variable bd-klmn-columns is-0">
        <div className="column is-9">
          <h1 className="title">Bienvenido/a</h1>
          <h2>Encuenta personas con la misma enfermedad que tu</h2>
          <Search onSubmit={handleSubmit}/>
          {loading ? <div>Cargando</div> : <Experiences experiences={experiences} />}

        </div>
        <div className="column is-3">
          <h2 className="title">Seguidores:</h2>
          <Followers uid={authUser.uid} userMap={user && user.followers}></Followers>
          <h2 className="title">Siguiendo:</h2>
          <Following uid={authUser.uid} userMap={user && user.following}></Following>
          <h2 className="title">Banners:</h2>
          {loadingBanner && <Banners banners={banners}></Banners> }
        </div>
      </div>
    </>
  );
}
export default LandingPage;