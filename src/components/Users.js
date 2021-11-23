import User from './User';

function Users({ users }) {

    return (
        users.map(
            user => <User key={user.uid} user={user} />
        )
    );
}
export default Users;