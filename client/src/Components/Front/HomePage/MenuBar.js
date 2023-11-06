import React , { useState } from "react";
import './Menu.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {logout} from '../../../Redux/actions/user';
import Menu from '@mui/material/Menu';



function MenuBar (props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
      props.handleLoginClick();
    };
    const[isMuted , SetIsMuted] = useState(true)
    const handleMute= () =>{
        SetIsMuted(!isMuted)
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return(
        <div className="hero">
           <div className="overlay"></div>
            <video 
                autoPlay loop muted={isMuted} plays-inline className="back-video"
            >
                <source src="https://res.cloudinary.com/turkiskander/video/upload/v1697672805/Reggie_Watts_Speculates_on_UFOs_and_Shares_Story_of_His_Own_Encounter_c41qdx.mp4" type="video/mp4"/>
            </video>
            <nav>
                <img className="logo" src="https://res.cloudinary.com/turkiskander/image/upload/v1697651294/White_Logo_AxA_z71dmj.png" />
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Media</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li>
                        {props.isAuth ? 
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar  src={props.user.Image} />
                                </IconButton>
                                </Tooltip>
                                <Menu
                                sx={{ mt: '45px'  }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                    <MenuItem  onClick={handleCloseUserMenu} >
                                    <Typography textAlign="center"  onClick={() => navigate(`/profile`)} >Profile</Typography>
                                    </MenuItem>
                                    <MenuItem  onClick={handleCloseUserMenu} >
                                    <Typography textAlign="center"  onClick={() => {
                                                                                        dispatch(logout());
                                                                                        navigate('/');
                                                                                        }} >
                                        Logout
                                    </Typography>
                                    </MenuItem>
                                
                                </Menu>
                            </Box>:
                        <button onClick={handleClick}>Sign In</button> }
                    </li>
                </ul>
            </nav>
            <div className="content">
                <div className="video-card">
                    <h1>Reggie Watts on UFO's</h1>
                    <p>Joe rogan podcast with Reggie Watts talking about UFO's </p>
                    <a href="#">Explore</a>
                </div>
                {isMuted ?
                    <button className="mute" onClick={handleMute}><ion-icon name="volume-mute-outline"></ion-icon></button>:
                    <button className="mute" onClick={handleMute}><ion-icon name="volume-high-outline"></ion-icon></button>
                }
            
            </div>
            
        </div>
    );
}
export default MenuBar;