import UserCardSimple from './UserCardSimple';
import { unFollow ,unMentor} from '../services/firestore';

const divStyle = {
    display:'flex',
    flexDirection: 'row',
  };

function Following({ uid, userMap }) {

    /*const onFollow = async (keyy, value) => {
        try {
            await followingUser(uid,keyy,value)
            console.log('followed',uid,keyy);
        } catch (error) {
            console.error('error:',error)
        }
    }*/

    const onUnFollow = async (keyy) => {
        try {
            await unFollow(uid,keyy)
            await unMentor(keyy,uid)

            console.log('desuscrito',uid,keyy);
        } catch (error) {
            console.error('error:',error)
        }
    }



    return (
        userMap!=null && Object.entries(userMap).sort().map(([keyy, value]) =>
        <div key={keyy+uid} style={divStyle}>
                <UserCardSimple key={keyy} uid={keyy} active={!!value} />
                {keyy}
                {value ? <div>Ya es tu mentor!</div> : <div>Pendiente de contestación</div>}

                <button onClick={()=>onUnFollow(keyy)}>Dejar de seguir</button>
            </div>
        )
    );
}
export default Following;