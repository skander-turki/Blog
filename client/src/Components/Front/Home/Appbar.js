import React from "react";
import './Appbar.css'
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {logout} from '../../../Redux/actions/user';
import { useNavigate } from "react-router-dom";
function Appbar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClickLogin = () => {
    props.handleLoginClick();
  };
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

    return(
        <>
            {!props.isAuth ?
            <div className="NavigationSection">
                <div className={`NavigationBar ${scrolled ? 'scrolled' : ''}`}>
                    <img src="https://res.cloudinary.com/turkiskander/image/upload/v1700613104/Internship/Assets/LogoTest_x9oddp.png"/>
                    <ul className="Navigation">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Write</a></li>
                        <button onClick={handleClickLogin}>Get Started</button>
                    </ul>
                </div>  
                <div className="AppBarContent">
                    <h1>Echoing Echoes .</h1>
                    <p>Unveiling Untold Stories.</p>
                    <button>Start reading</button>
                </div>
            </div>:
            <div className="UserNavigationBar">
                <img className="logo" src="https://res.cloudinary.com/turkiskander/image/upload/v1700613104/Internship/Assets/LogoTest_x9oddp.png"/>
                <ul className="UserNavigation">
                    <li className="Navigation"><ion-icon name="create-outline"></ion-icon><a href="#">Write</a></li>
                    <div className="profile">
                        <img src={props.user.Image} onClick={handleMenuClick}/>
                        {menuVisible && (
                        <div className="scroll-menu">
                            <ul className="MenuList">
                                <li 
                                    className="MenuItem"
                                    onClick={() => {
                                        dispatch(logout());
                                        navigate('/');
                                        }}
                                    >
                                <ion-icon name="log-out-outline"></ion-icon>
                                <span>Sign Out</span>
                                </li>
                            </ul>
                        </div>
                        )}
                    </div>
                </ul>
                
            </div>  
            }
        </>
    );
}
export default Appbar;