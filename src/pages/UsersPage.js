import Users from '../components/Users';
import { useUsers } from '../hooks/useUsers';

function UsersPage() {

  const { loading, users } = useUsers()

  return (
    <>
      <h1 className="title">Lista de usuarios</h1>
      {loading ? <div>Cargando</div> : <Users users={users} />}
    </>
  );
}
export default UsersPage;