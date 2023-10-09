import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GoogleLogin } from '@react-oauth/google';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import jwtDecode from 'jwt-decode'


import "./Style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../../../Redux/actions/user';


function LoginForm  (props)  {
    const navigate  = useNavigate();
    const dispatch = useDispatch(); 
    /************* page rendering******************* */
    const isShowLogin = props.isShowLogin;
    const [userGoogle , setUserGoogle] = useState({
        LoginByGoogle : true,
        Mail : "",
        Firstname : "",
        Lastname : "",
        Image : ""
      }); 
            
    const responseMessage = (response) => {
        const res = jwtDecode(response.credential);
        console.log(res.email)
        setUserGoogle({
            LoginByGoogle : true,
            Mail : res.email,
            Firstname : res.given_name,
            Lastname : res.family_name,
            Image : res.picture
        })
        
    };
    React.useEffect (() => {
        if(userGoogle.Firstname !== "")
        {
            dispatch(login(userGoogle));
        }
      }, [userGoogle])

    const errorMessage = (error) => {
        console.log(error);
    };
    
    const handleClickLogin = () => {
        props.handleLoginClick();
      };
    /****************** login Functions********************** */
    const [user , setUser] = useState({
        LoginByGoogle : false,
        Mail : "",
        HashedPassword : ""
      }); 
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

      const LoginResult = useSelector((state) => state.userReducer.userLogin);
      const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(login(user));
      };
      React.useEffect (() => {
        
        if(LoginResult.status === "200")
        {
            if(LoginResult.user.isAdmin === true)
            {
                handleClickLogin(); 
                navigate('/Dashboard');
            }
            else 
            {
                handleClickLogin(); 
                window.location.reload()
            }
        }
      }, [LoginResult])
      /*******************password******************** */
      const [showPassword, setShowPassword] = React.useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };  
      
  return (
    <>
    { !isShowLogin ? 
    <div className={`${props.isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
            <form>
               
                <h1 className="login-text">Connectez vous</h1>
                <TextField  
                    label="Mail" 
                    variant="standard" 
                    name="Mail" 
                    onChange={handleChange}
                    sx={{
                        display : 'flex',
                        justifyContent : 'center',
                        marginBottom : '10%'
                    }}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                    }
                                    name="HashedPassword" 
                                    onChange={handleChange}
                                />
                    </FormControl>
                <GoogleLogin 
                    onSuccess={responseMessage} 
                    onError={errorMessage} 
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    />
                 
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop : '10%' , marginBottom : '10%'}}>
                    <Grid item xs={6}>
                        <Button 
                            variant="contained" 
                            onClick={handleConfirm}
                            sx={{
                                display : 'flex',
                                justifyContent : 'center',
                                alignItems : 'center',
                                fontFamily : 'sans-serif',
                                fontWeight : 'bold',
                                textTransform :'capitalize',
                                }}
                            
                            >Connexion</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button 
                            variant="outlined" 
                            sx={{
                                display : 'flex',
                                justifyContent : 'center',
                                alignItems : 'center',
                                fontFamily : 'sans-serif',
                                fontWeight : 'bold',
                                textTransform :'capitalize',
                                }}
                            onClick={handleClickLogin}
                            >Retourner</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
      </div>
    </div> : null}
    </>
  );
};

export default LoginForm;
