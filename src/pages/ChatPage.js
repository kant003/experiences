import { useState } from 'react';
import { useParams } from 'react-router';
import { useChats } from '../hooks/useChats';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTimeAgo from 'react-time-ago'


function ExperieneDetail() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const { uid1, uid2 } = useParams();
  const idRoom = [uid1, uid2].sort().join('_');
  const { loading, chats, addMsg } = useChats({ idRoom })
  const [msg, setMsg] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    addMsg(authUser.uid, msg)
  }

  const listMsg = () => loading ?
    <div>Cargando...</div>
    :
    chats.map((chat) =>
      <div key={chat.id} className={chat.uid === uid1 ? 'chatMsgLeft' : 'chatMsgRight'}>
        {chat.msg} ( 
          {chat.createdAt &&  <ReactTimeAgo date={chat.createdAt.toDate()} locale="es-ES"/>
          /*chat.createdAt.toDate().toLocaleString('es-ES', { timeZone: 'UTC' })*/
          } )
      </div>
    )

  const form = () => <form onSubmit={(e) => handleSubmit(e)}>

    <div className="field" style={formStyle}>
      <p className="control has-icons-right">
         <input className="input is-primary" value={msg} onChange={(e) => setMsg(e.target.value)} />
        
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={faPaperPlane} />

        </span>
      </p>
      <div className="control">
        <input className="button is-info" type="submit" />
      </div>
    </div>


  </form>


  const chatStyle = {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  return (
    <>
      <h2 className="title">Conversación:</h2>
      <div style={chatStyle}>
        {listMsg()}
        <hr/>
        {form()}
      </div>
    </>
  );
}
export default ExperieneDetail;