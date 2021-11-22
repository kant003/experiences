import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getExperience } from "../services/experiencesFirestore";
import Experience from '../components/Experience';
import Comments from '../components/Commnets';

function ExperieneDetail() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [experience, setExperience] = useState(null)
  const { id } = useParams();

  useEffect(() => {

    getExperience(id).then(exp => {
      setExperience({ ...exp.data(), id: exp.id })
    })

  }, [id])


  return (
    <>
      {experience && <Experience experience={experience} />}
      <div>Comentarios:</div>
      {experience && <Comments idExp={id} authUser={authUser} />}
    </>
  );
}
export default ExperieneDetail;