import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { notify } from '../services/Utils';

function Comments({ idExp, authUser }) {

    const [text, setText] = useState("");
    const { loading, comments, addComment, deleteComment } = useComments({ idExp })


    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = { text, userId: authUser.uid, userDisplayName: authUser.displayName, userPhotoUrl: authUser.photoURL }
        addComment(comment)
        notify('Comentario añadido')

    }

    const handleRemove = (event, id) => {
        event.preventDefault();
        deleteComment(idExp, id)
        notify('Comentario eliminado')

    }

    const form = () =>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Mensaje:
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <input type="submit" />
        </form>


    const list = () => loading ?
        <div>Cargando...</div>
        :
        comments.map((comment) =>
            <div key={comment.id}>



                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={comment.userPhotoUrl} alt="foto" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div>
                            <span className="title is-6">
                                {comment.userDisplayName}
                            </span>
                            <button onClick={(e) => handleRemove(e, comment.id)} className="delete"></button>

                            &nbsp;
                            dice:
                        </div>

                        <div className="content">
                            {comment.text}
                        </div>
                        <div>
                        </div>

                    </div>

                </div>


            </div>


        )

    return (
        <div>
            <div>Deja tu comentario:</div>
            {form()}
            {list()}
        </div>
    )
}
export default Comments;