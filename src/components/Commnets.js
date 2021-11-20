import { useState, useEffect } from 'react';
import { getComentsByExperienceId, saveComment, removeComment } from "../services/firestore";
import { onSnapshot } from "firebase/firestore";

function Comments({ idExp }) {

    const [comentsList, setComentsList] = useState([])

    const [text, setText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        saveComment(idExp, text)
            .then(() => setText(""));
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(getComentsByExperienceId(idExp),
            snapshot => setComentsList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [idExp])


    return (
        <div>
            <div>Deja tu comentario:</div>
            <form onSubmit={handleSubmit}>
                <label>Mensaje:
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            {
                comentsList.map((comment) =>
                    <div key={comment.id}>- {comment.text}
                    <botton onClick={(e) => removeComment(idExp, comment.id)}> - X</botton>
                    </div>

                    
                )
            }
        </div>

    );
}
export default Comments;