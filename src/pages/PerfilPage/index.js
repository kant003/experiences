import Experiences from '../../components/Experiences';
import Followers from '../../components/Followers';
import Following from '../../components/Following';
import User from '../../components/User';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser } from '../../services/usersFirestore';
import { useOwnExperiences } from '../../hooks/useOwnExperiences';
import "./PerfilPage.css";

function PerfilPage() {
  const [user, setUser] = useState(null);
  const { uid } = useParams();
  const { loading, experiences } = useOwnExperiences({ uid })

  useEffect(() => {
    getUser(uid).then(u => setUser(u.data()));
  }, [uid]);

  return (
    <>
      <div class="profile-container">
        <User user={user} />
      </div>
      {/*
      <div className="columns is-variable bd-klmn-columns is-0">
        <div className="column is-6">
          <h1 className="title">Perfil del usuario</h1>
          <User user={user} />
          <h1 className="title">Tus experiencias añadidas</h1>
          {loading ? <div>Cargando...</div> : <Experiences experiences={experiences} />}
        </div>
        <div className="column is-6">
          <h2 className="title">Seguidores:</h2>
          <Followers uid={uid} userMap={user && user.followers}></Followers>
          <h2 className="title">Siguiendo:</h2>
          <Following uid={uid} userMap={user && user.following}></Following>
          <h2 className="title">Banners:</h2>
        </div>
      </div>
      </>*/}
      </>
  );
}

export default PerfilPage;

