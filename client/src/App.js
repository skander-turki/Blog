import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Back/Dashboard";
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Redux/actions/user';
import PrivateRoute from './Components/Front/Auth/PrivateRoute';
import HomeAdmin from './Pages/Back/HomeAdmin';
import CreatePost from './Pages/Back/CreatePost/CreatePost';
import DisplayAllPosts from './Pages/Back/DisplayPosts';
import ManageUser from './Pages/Back/ManageUser';
import Index2 from './Pages/Front/index2';
import ThemePersonalisation from './Pages/Back/ThmePersonalisation';

function App() {
  const [isAdmin, setIsAdmin] = React.useState(); 
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);

useEffect(() => {
    dispatch(currentUser());
}, [dispatch]);
  
  return (
    <Routes>
      <Route path='/' element={
                                    <Index2/>  
                                }>
          

      </Route>
      <Route path='/Dashboard' element={<Dashboard/>} user={user}>
        <Route path='/Dashboard/' element={<HomeAdmin/>} />
        <Route path='/Dashboard/Users' element={<ManageUser/>} />
        <Route path='/Dashboard/AddPosts' element={<CreatePost/>} />
        <Route path="/Dashboard/DisplayAllPosts" element={<DisplayAllPosts />} /> 
        <Route path="/Dashboard/Theme" element={<ThemePersonalisation />} />                                 
      </Route>
    </Routes>
  );
}

export default App;
