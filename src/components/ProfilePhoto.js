const ProfilePhoto = ({ user }) => {
  return (
    <figure className="profile-photo-container">
      <img className="profile-photo" src={user && user.photoURL} alt="Usuario" />
    </figure>
  )
}

export default ProfilePhoto;
