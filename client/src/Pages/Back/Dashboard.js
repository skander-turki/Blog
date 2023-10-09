import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from '../../Redux/actions/user';
import { Navigate } from "react-router-dom";
import AppBarAdmin from '../../Components/Back/AppBarAdmin';
import Menu from '../../Components/Back/Menu';
import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
import SideMenu from '../../Components/Back/SideMenu';
import TopBar from '../../Components/Back/TopBar';
import '../../Components/Back/SideMenu.css'

function Dashboard () {
    const [isNavigationActive, setIsNavigationActive] = React.useState(false);

    const toggleNavigation = () => {
        setIsNavigationActive(prevState => !prevState);
    }
    const [isAdmin, setIsAdmin] = React.useState(false); 
    const [loading, setLoading] = React.useState(true); // Add loading state
    const user = useSelector((state) => state.userReducer.user);
   const dispatch = useDispatch();
   React.useEffect(() => {
    dispatch(currentUser(user.isAdmin)).then(() => {
        setLoading(false); // Set loading to false after action is complete
    });
}, [dispatch, user.isAdmin]);
  React.useEffect(() => {
    if(user.isAdmin === true)
    {
      setIsAdmin(true);
    } else {
        setIsAdmin(false);
    }
   
  }, [user])

    if (loading) {
        return <div></div>;
        }
    return (
        <>
        { isAdmin === false ?  
        <Navigate to='/' replace />
        : 
        
            <div className='container'> 
                <SideMenu isNavigationActive={isNavigationActive}/>
                <div className={`main ${isNavigationActive ? 'active' : ''}`}>
                    <TopBar user={user} toggleNavigation={toggleNavigation}  />   
                    <Outlet />
                </div> 
            </div>
        }
        </>
    );
}
export default Dashboard ; 