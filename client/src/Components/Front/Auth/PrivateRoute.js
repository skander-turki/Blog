import { Navigate } from "react-router-dom";
import * as React from 'react';
const PrivateRoute = ({ children, isAuth }) => {
   return (
       isAuth === true ? children : <Navigate to='/' replace />
   )
}

export default PrivateRoute