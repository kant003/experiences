import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ children}) => {
  const [user, _] = useState(JSON.parse(localStorage.getItem('authUser')));
  return user ? children : <Navigate to="/login" />;
}

export default Private;
