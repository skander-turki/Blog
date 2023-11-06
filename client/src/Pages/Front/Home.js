import React , { useState } from "react";
import MenuBar from "../../Components/Front/HomePage/MenuBar";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../../Redux/actions/user';
import LoginForm from '../../Components/Front/Auth/LoginForm';
import {  Outlet } from "react-router-dom";
import VideoSlider from "../../Components/Front/HomePage/VideoSlider";
import DisplayPost from "../../Components/Front/HomePage/DisplayPosts";

function Home() {
    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);
  const user = useSelector((state) => state.userReducer.user);
    return (
        <>
        <MenuBar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} />
        <Outlet />
        <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick}/>
        <VideoSlider /> 
        <DisplayPost />   
        </>    
            
            
       
    );
}
export default Home ;