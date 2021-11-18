import { useParams } from 'react-router';
import Experiences from '../components/Experiences';

function YourExperiencesPage() {
  const { uid } = useParams();

  return (
    <>
      <h1 className="title">Lista de experiencias enviadas por tí</h1>
      <Experiences uid={uid}/>
    </>
  );
}
export default YourExperiencesPage;