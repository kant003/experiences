import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getExperience } from "../services/experiencesFirestore";
import Experience from '../components/Experience';
import Comments from '../components/Commnets';

function ExperienceDetail() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [experience, setExperience] = useState(null)
  const { id } = useParams();

  useEffect(() => console.log(id), []);

  useEffect(() => {
    console.log(id);
    getExperience(id).then(exp => {
      setExperience({ ...exp.data(), id: exp.id })
    })
  }, [id])

  return (
    <>
      {experience && <Experience experience={experience} mode="detail" />}
      <div>Comentarios:</div>
      {experience && <Comments idExp={id} authUser={authUser} />}
    </>
  );
}
export default ExperienceDetail;
