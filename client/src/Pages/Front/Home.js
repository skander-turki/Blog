import React , { useState } from "react";
import Appbar from "../../Components/Front/HomePage/Appbar";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../../Redux/actions/user';
import LoginForm from '../../Components/Front/Auth/LoginForm';
import SignUpForm from "../../Components/Front/Auth/SignUpForm";
import {  Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import VideoSlider from "../../Components/Front/HomePage/VideoSlider";


function Home() {
    const [isShowLogin, setIsShowLogin] = useState(true);
    const [isShowSignUp, setIsShowSignUp] = useState(true);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    const handleSignUpClick = () => {
        setIsShowSignUp((isShowSignUp) => !isShowSignUp);
    };
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);
  const user = useSelector((state) => state.userReducer.user);
    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick}/>
            <Outlet />
        </Box>
        <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick}/>
        <SignUpForm isShowSignUp={isShowSignUp} handleSignUpClick={handleSignUpClick}></SignUpForm>
        <VideoSlider />    
        </>    
            
            
       
    );
}
export default Home ;