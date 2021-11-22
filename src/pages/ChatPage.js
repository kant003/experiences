import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useChats } from '../hooks/useChats';

function ExperieneDetail() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const { uid1,uid2 } = useParams();
  const idRoom = [uid1,uid2].sort().join('_');
  const {loading, chats, addMsg} = useChats({idRoom})
  const [msg, setMsg] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    addMsg(authUser.uid, msg)
  }


  return (
    <>
      <h2 className="title">Chat:</h2>

      <div>Conversación:</div>

      {
                loading?
                <div>Cargando...</div>
                :
                chats.map((chat) =>
                    <div key={chat.id} className={chat.uid===uid1 ? 'is-flex is-justify-content-right' : null}>
                        {chat.msg} ( {chat.createdAt && chat.createdAt.toDate().toLocaleString('es-ES', { timeZone: 'UTC' })} )
                    </div>


                )
            }


            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Mensaje:
                    <input value={msg} onChange={(e) => setMsg(e.target.value)} />
                </label>
                <input type="submit" />
            </form>
            


    </>
  );
}
export default ExperieneDetail;