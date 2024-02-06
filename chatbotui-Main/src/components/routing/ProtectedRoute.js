import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import withRouter from '../WrapperComponents/withRouter';
const ProtectedRoute = ({ children }) => {
  // const { organisationUrl } = params || {};
  const token = localStorage.getItem('token');
  let location = useLocation();
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  // if (!organisationUrl || organisationUrl == 'null') {
  //   return <Navigate to='/organisations' state={{ from: location }} />;
  // }
  return token ? children : <Navigate to='/login' state={{ from: location }} />;
};
export default withRouter(ProtectedRoute);
