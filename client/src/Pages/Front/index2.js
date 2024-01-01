import React, { useEffect, useState } from "react";
import "./style.css";
import Appbar from "../../Components/Front/Home/Appbar";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from '../../Redux/actions/user';
import LoginForm from '../../Components/Front/Auth/LoginForm';
import HomeContent from "./HomeContent";
import Footer from "../../Components/Front/Home/Footer";
import {getTheme} from '../../Redux/actions/theme';

function index2() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);
    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    
    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTheme());
    }, [dispatch]);
    const theme = useSelector((state) => state.themereducer.theme);
    useEffect(() => {
        const root = document.documentElement; // Select the root element
        root.style.setProperty('--primarycolor', theme.PrimaryColor);
        root.style.setProperty('--secondarycolor', theme.SecondaryColor);
        root.style.setProperty('--thirdcolor', theme.ThirdColor);
        root.style.setProperty('--fourthcolor', theme.FourthColor);
        root.style.setProperty('--Navigation-font-size', `${theme.NavigationFontSize}px`);
        root.style.setProperty('--title-font-size',  `${theme.TitleFontSize}px`);
        root.style.setProperty('--desc-font-size',  `${theme.SubTitleFontSize}px`);
        root.style.setProperty('--sides-padding',  `${theme.SidePadding}px`);
    }, [theme])
    return(
        <div >
            <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} theme={theme}/>
            <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick} theme={theme}/>
            <HomeContent  isAuth={isAuth} user={user} />
            

            
        </div>
    )
}
export default index2;