import "./Style.css"

import * as React from 'react';
import {logout} from '../../../Redux/actions/user'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SideMenu (props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isNavigationActive, setIsNavigationActive] = React.useState(false);
    React.useEffect(()=> {
        setIsNavigationActive(props.isNavigationActive)
    },[props.isNavigationActive])
    React.useEffect(() => {
        let list = document.querySelectorAll('.navigation li');
    
        function activeLink() {
          list.forEach((item) => item.classList.remove('hovered'));
          this.classList.add('hovered');
        }
    
        list.forEach((item) =>
          item.addEventListener('mouseover', activeLink)
        );
    
        return () => {
          list.forEach((item) =>
            item.removeEventListener('mouseover', activeLink)
          );
        };
      }, []);
    return (
        
            <div className="navigation">
                <ul>
                    <li>
                        <a href="/Dashboard/">
                            <span className='icon'><ion-icon name="home"></ion-icon> </span>
                            <span className='title'>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Dashboard/Users">
                            <span className='icon'><ion-icon name="people"></ion-icon></span>
                            <span className='title'>Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className='icon'><ion-icon name="notifications"></ion-icon></span>
                            <span className='title'>Notifications</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Dashboard/AddPosts">
                            <span className='icon'><ion-icon name="add-circle"></ion-icon></span>
                            <span className='title'>Add posts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Dashboard/DisplayAllPosts">
                            <span className='icon'><ion-icon name="list"></ion-icon></span>
                            <span className='title'>Display Posts</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className='icon'><ion-icon name="settings"></ion-icon></span>
                            <span className='title'>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Dashboard/Theme">
                            <span className='icon'><ion-icon name="color-palette"></ion-icon></span>
                            <span className='title'>Theme</span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <span className='icon'><ion-icon name="log-out"></ion-icon></span>
                            <span onClick={() => {
                                                    dispatch(logout());
                                                    navigate('/');
                                            }} className='title'>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </div>
       
    )
}
export default SideMenu