import { Link } from 'react-router-dom';

const UserDetail = (props) => {
  return (
    <>
      {!props.itsMe() && props.iAmYourFollower() && <button className="button is-danger is-rounded is-small mr-4" onClick={() => props.onUnFollow(props.user.uid)}>Dejar de Seguir</button>}
      {!props.itsMe() && !props.iAmYourFollower() && <button className="button is-success is-rounded mr-4" onClick={() => props.onFollow(props.user.uid)}>Seguir</button>}
      {!props.itsMe() && props.isMyMentor() && props.user && <Link className="button is-info is-rounded is-small mr-4" to={`/chat/${props.authUser.uid}/${props.user.uid}`}>Chat</Link>}
      {!props.itsMe() && props.isMyMentor() && <span className="tag is-link mr-4">¡Es tu mentor!</span>}
    </>
  )
}

export default UserDetail;
