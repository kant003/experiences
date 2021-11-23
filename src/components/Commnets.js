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
                <img src={comment.userPhotoUrl} alt="foto" width="40" />
                {comment.userDisplayName} dice: {comment.text}
                <button onClick={(e) => handleRemove(e, comment.id)} class="delete"></button>
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