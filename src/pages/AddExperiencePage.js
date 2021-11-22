import { useState } from "react";
import Experiences from "../components/Experiences";
import Form from "../components/Form";
import { useOwnExperiences } from "../hooks/useOwnExperiences";

function AddExperience() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const { loading, experiences } = useOwnExperiences({ uid: authUser.uid })

  return (
    <>
      <div className="columns is-variable bd-klmn-columns is-0">
        <div className="column is-6">
          <h1 className="title">Añade una nueva experiencia</h1>
          <Form></Form>
        </div>
        <div className="column is-6">
          <h1 className="title">Tus experiencias</h1>
          { loading ? <div>Cargando...</div> :  <Experiences experiences={experiences} />}
        </div>
      </div>
    </>
  );
}

export default AddExperience;

