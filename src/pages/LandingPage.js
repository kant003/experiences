import Followers from '../components/Followers';
import Following from '../components/Following';
import Experiences from '../components/Experiences';
import Search from '../components/Search';
import Banners from '../components/Banners';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useExperiences} from '../hooks/useExperiences';
import {useBanners} from '../hooks/useBanners';
import {notify} from '../services/Utils';
import {getUserRef} from '../services/experiencesFirestore';
import {onSnapshot} from '@firebase/firestore';

function LandingPage({usingEthereum}) {
  const [user, setUser] = useState(null);
  const [keyword] = useState('');
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const {loading, experiences} = useExperiences({keyword, uid: authUser.uid});
  const {loadingBanner, banners} = useBanners();
  let navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(getUserRef(authUser.uid), u => setUser(u.data()));

    return () => unsub();
  }, [keyword, authUser.uid]);

  const handleSubmit = ({keyword}) => {
    navigate(`/experiences/${keyword}`);
    notify('Buscando...');
    console.log('desde padre', keyword);
  };

  return (
    <>
      <div className="columns is-variable bd-klmn-columns is-0">
        <div className="column is-9">
          <h1 className="title">Bienvenido/a</h1>
          <h2>Encuenta personas con la misma enfermedad que tu</h2>
          <Search onSubmit={handleSubmit} />
          {loading ? <div>Cargando</div> : <Experiences experiences={experiences} />}
        </div>
        <div className="column is-3">
          
          {loadingBanner && <Banners banners={banners}></Banners>}
          {usingEthereum && <h2 className="subtitle">Estas usando una wallet de ethereum</h2>}
        </div>
      </div>
    </>
  );
}
export default LandingPage;
