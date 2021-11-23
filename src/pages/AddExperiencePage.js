import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Experiences from "../components/Experiences";
import Form from "../components/Form";
import { useOwnExperiences } from "../hooks/useOwnExperiences";
import { getExperience } from "../services/experiencesFirestore";

function AddExperience() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const { loading, experiences } = useOwnExperiences({ uid: authUser.uid })
  const { id } = useParams();

  const [experience, setExperience] = useState(null)

  
  useEffect(() => {

    id && getExperience(id).then(exp => {
      setExperience({ ...exp.data(), id: exp.id })
    })

  }, [id])


  const titles = () => id ?
    <h1 className="title">Edición de experiencia</h1>
    :
    <h1 className="title">Añade una nueva experiencia</h1>


  return (
    <>
      <div className="columns is-variable bd-klmn-columns is-0">
        <div className="column is-6">
          {titles()}
          <Form id={id} experience={experience}></Form>
        </div>
        <div className="column is-6">
          <h1 className="title">Tus experiencias</h1>
          {loading ? <div>Cargando...</div> : <Experiences experiences={experiences} />}
        </div>
      </div>
    </>
  );
}

export default AddExperience;

