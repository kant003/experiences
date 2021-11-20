import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getExperience } from "../services/firestore";
import Experience from '../components/Experience';
import Comments from '../components/Commnets';

function ExperieneDetail() {
  const [experince, setExperience] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    getExperience(id).then(exp => setExperience(exp.data()))

    /*console.log(uid)
    getUser(getUserRef(uid)).then(u => {
      setUser(u.data())
    })

    const unsub = onSnapshot(getUserRef(uid), (u) => {
      setUser(u.data())
    });
    return () => unsub();*/
  }, [id])


  return (
    <>
      <div>ok {id} {experince && experince.title} </div>
      {experince && <Experience title={experince.title} text={experince.text} type={experince.type} tags={experince.tags} createdAt={experince.createdAt} id={experince.id} userRef={experince.userRef} />  }
      <div>Comentarios:</div>
      {experince && <Comments idExp={id} /> }
    </>
  );
}
export default ExperieneDetail;