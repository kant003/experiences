import { useState, useEffect } from 'react';
import { getUser } from "../services/usersFirestore";

export default function UserCardSimple({ uid, active }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(uid).then(user => setUser(user.data()))
  }, [uid])

  return (
    <>
      <div>{user && user.displayName}</div> 
      <div>{user && user.email}</div>
    </>
  )
}
