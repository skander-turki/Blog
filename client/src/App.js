import * as React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Front/Home";
import Dashboard from "./Pages/Back/Dashboard";
import ProfileDashboard from './Pages/Front/ProfileDashboard';
import Compte from './Components/Front/Profile/compte';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Redux/actions/user';
import PrivateRoute from './Components/Front/Auth/PrivateRoute';
import HomeAdmin from './Pages/Back/HomeAdmin';
import AddPosts from './Pages/Back/AddPost';
import DisplayAllPosts from './Pages/Back/DisplayPosts';
import ManageUser from './Pages/Back/ManageUser';
function App() {
  const [isAdmin, setIsAdmin] = React.useState(); 
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  React.useEffect(() => {
    dispatch(currentUser());
}, [dispatch]);
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
          <Route path='/Profile' element={
                                          <PrivateRoute isAuth={isAuth}>
                                              <ProfileDashboard/>
                                          </PrivateRoute>
                                          }>
              <Route path='/Profile/Compte' element={<Compte/>} />
          </Route>
      </Route>
      <Route path='/Dashboard' element={<Dashboard/>} user={user}>
        <Route path='/Dashboard/' element={<HomeAdmin/>} />
        <Route path='/Dashboard/Users' element={<ManageUser/>} />
        <Route path='/Dashboard/AddPosts' element={<AddPosts/>} />
        <Route path="/Dashboard/DisplayAllPosts" element={<DisplayAllPosts />} />                                  
      </Route>
    </Routes>
  );
}

export default App;
