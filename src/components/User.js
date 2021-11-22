
export default function User({user, mode}) {
    return (
        <div className="card">

            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user && user.photoURL} alt="Placeholder image2" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{user && user.displayName}</p>
                        <p className="subtitle is-6">{user && user.email}</p>
                    </div>
                </div>
                <div className="content">
                    <div>uid: {user && user.uid}</div>
                    <div>emailVerified: {user && user.emailVerified?'Si':'No'}</div>
                    <div>isAnonymous: {user && user.isAnonymous?'Si':'No'}</div>
                    <div>Seguidores: {user && user.followers && Object.keys(user.followers).length && 'nada'}</div>
                    <div>Siguiendo: {user && user.following && Object.keys(user.following).length && 'nada'}</div>
                    <div>Roles: {user && user.roles && Object.keys(user.roles).length && 'nada'}</div>
                    <div>Creado en: {user && user.createdAt.toDate().toDateString()}</div>
                    <div>Foto: {user && user.photoURL}</div>
                    <div>Cartera NFT: XXX</div>
                </div>
            </div>
        </div>
    )
}