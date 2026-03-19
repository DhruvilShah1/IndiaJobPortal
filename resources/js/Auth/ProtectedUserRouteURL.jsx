import { Navigate, useParams } from 'react-router-dom';
import React from 'react';

const ProtectedUserRouteURL = ({ children }) => {
  const { user_id } = useParams();
  const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
  const loggedInUserId = user_info.id;

  if (parseInt(user_id) !== loggedInUserId) {
  
    return <Navigate to="/dashboard" replace />;
  }

  return children; 
};

export default ProtectedUserRouteURL;