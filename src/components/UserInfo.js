const UserInfo = ({ user }) => {
  return (
    <div class="profile-text">
      <div class="profile-info">
        <h3 className="profile-title">{user && user.displayName}</h3>
        <h3 className="profile-subtitle">{user && user.email}</h3>
      </div>
      <div class="profile-info mt-2">
        <h3 className="profile-text">{user && user.certificate ? '✔ Profesional verficado' : 'Usuario común'}</h3>
      </div>
      <div class="profile-info-flex mt-2">
        <h3 className="profile-title">Siguiendo: </h3><p className="mr-3">9{user && user.following && Object.keys(user.following).length}</p>
        <h3 className="profile-title">Seguidos: </h3><p>2{user && user.following && Object.keys(user.following).length}</p>
      </div>
    </div>
  )
}

export default UserInfo;
