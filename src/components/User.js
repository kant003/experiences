
export default function User({ displayName, email, photoURL, uid, emailVerified, isAnonymous }) {

    return (
        <div className="card">

            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={photoURL} alt="Placeholder image2" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{displayName}</p>
                        <p className="subtitle is-6">{email}</p>
                    </div>
                </div>

                <div className="content">
                    <div>uid: {uid}</div>
                    <div>emailVerified: {emailVerified}</div>
                    <div>isAnonymous: {isAnonymous}</div>
                </div>
            </div>
        </div>
    )
}