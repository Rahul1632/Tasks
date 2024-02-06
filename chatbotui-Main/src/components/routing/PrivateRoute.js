import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import withRouter from '../components/WrapperComponents/withRouter';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let location = useLocation();
 
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  
  return token ? children : <Navigate to='/login' state={{ from: location }} />;
};
export default withRouter(PrivateRoute);
