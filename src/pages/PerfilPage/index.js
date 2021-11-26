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

  useEffect(() => {
    getUser(uid).then(u => setUser(u.data()));
  }, [uid]);

  return (
    <>
        <User user={user} />
        <div className="profile-experiences-container">
          <h2 className="is-size-4 has-text-weight-bold">Experiencias</h2>
          {/** TODO: Ver experiencias en el perfil. DEPENDS: Diseño experiencias **/}
        </div>
      </>
  );
}

export default PerfilPage;

