import React from 'react';
import { Navigate, useLocation } from 'react-router';

function PublicRouting({ children }) {
  const token = localStorage.getItem('token');
  let location = useLocation();
  return <div>{token ? <Navigate to='/dashboard' state={{ from: location }} /> : children}</div>;
}

export default PublicRouting;
