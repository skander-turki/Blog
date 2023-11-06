import * as React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Index from "./Pages/Front/index";
import Home from './Pages/Front/Home';
import DisplayPost from './Pages/Front/DisplayPost';
import Dashboard from "./Pages/Back/Dashboard";
import ProfileDashboard from './Pages/Front/ProfileDashboard';
import Compte from './Components/Front/Profile/compte';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Redux/actions/user';
import PrivateRoute from './Components/Front/Auth/PrivateRoute';
import HomeAdmin from './Pages/Back/HomeAdmin';
import AddPosts from './Pages/Back/AddPost';
import CreatePost from './Pages/Back/CreatePost/CreatePost';
import DisplayAllPosts from './Pages/Back/DisplayPosts';
import ManageUser from './Pages/Back/ManageUser';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Assets/theme";

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
      <Route path='/' element={
                                <ThemeProvider theme={theme}>
                                  <CssBaseline />
                                    <Index/>
                                </ThemeProvider>
                                }>
          <Route path='/' element={<Home/>} />
          <Route path='/post/:id' element={<DisplayPost/>} />
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
        <Route path='/Dashboard/AddPosts' element={<CreatePost/>} />
        <Route path="/Dashboard/DisplayAllPosts" element={<DisplayAllPosts />} />                                  
      </Route>
    </Routes>
  );
}

export default App;
