import ProfilePhoto from './ProfilePhoto';

const UserSimple = (props) => {
  console.log(props.user)
  return (
    <>
      <div class="profile-photo-simple">
        <ProfilePhoto user={props.user} />
      </div>
      <div class="user-simple-container mt-4">
        <h1 className="mr-4">{props.user && props.user.displayName}</h1>
        {!props.itsMe() && props.iAmYourFollower() && <button className="button is-small" onClick={() => props.onUnFollow(props.user.uid)}>Dejar de Seguir</button>}
        {!props.itsMe() && !props.iAmYourFollower() && <button className="button is-small" onClick={() => props.onFollow(props.user.uid)}>Seguir</button>}
      </div>
    </>
  );
}

export default UserSimple;
