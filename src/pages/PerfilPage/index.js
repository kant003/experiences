import Experiences from '../../components/Experiences';
import Followers from '../../components/Followers';
import Following from '../../components/Following';
import User from '../../components/User';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser } from '../../services/usersFirestore';
import { useOwnExperiences } from '../../hooks/useOwnExperiences';

function PerfilPage() {
  const [user, setUser] = useState(null);
  const { uid } = useParams();
  const { loading, experiences } = useOwnExperiences({ uid })
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {
    getUser(uid).then(u => setUser(u.data()));
  }, [uid]);

  return (
    <>
        <User user={user} />
        <div className="profile-experiences-container mb-5">
          <h2 className="is-size-4 has-text-weight-bold has-text-centered mb-2">Experiencias</h2>
          {loading ? <div>Cargando</div> : <Experiences experiences={experiences} />}
        </div>
        <h2 className="is-size-4 has-text-weight-bold">Seguidores</h2>
        <Followers uid={authUser.uid} userMap={user && user.followers}></Followers>
        <h2 className="is-size-4 has-text-weight-bold">Siguiendo</h2>
        <Following uid={authUser.uid} userMap={user && user.following}></Following>
      </>
  );
}

export default PerfilPage;

