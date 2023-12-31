import React, { useState } from "react";
import "./Style.css";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { useNavigate  } from 'react-router-dom';
import {register , uploadImage} from '../../../Redux/actions/user';
import { Alert } from 'react-alert'








function SignUpForm (props) {
    // ************ handle page   ************** /// 
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const isShowSignUp = props.isShowSignUp;
    const handleSignUpClick = () => {
      props.handleSignUpClick();
    };

    //********** handle user form ***************** */
    const [user , setUser] = useState({
        Firstname : "",
        Lastname : "",
        Mail : "",
        PhoneNumber : "",
        Birthdate : "",
        HashedPassword:"",
        Image: ''
      }); 

        const [IsFirstnameValid, setIsFirstnameValid] = useState(false);
        const [FirstnameError, setFirstnameError] = useState('');
        const [FirstnameTouched, setFirstnameTouched] = useState(false);
        const [IsLastnameValid, setIsLastnameValid] = useState(false);
        const [LastnameError, setLastnameError] = useState('');
        const [LastnameTouched, setLastnameTouched] = useState(false);
        const [IsMailValid, setIsMailValid] = useState(false);
        const [MailTouched, setMailTouched] = useState(false);
        const [IsPasswordValid, setIsPasswordValid] = useState(false);
        const [PasswordError, setPasswordError] = useState('');
        const [PasswordTouched, setPasswordTouched] = useState(false);
        const [IsCPasswordValid, setIsCPasswordValid] = useState(false);
        const [CPasswordError, setCPasswordError] = useState('');
        const [CPasswordTouched, setCPasswordTouched] = useState(false);
        const [IsPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
        const [IsBirthdateValid, setIsBirthdateValid] = useState(false);
        const [IsFileValid, setIsFileValid] = useState(false);
        const [IsFormValid , setIsFormValid] = useState(false);

        const handleFirstname = (e) => {
            if (e.target.value.length < 3) {
              setIsFirstnameValid(false);
              setFirstnameError('Firstname must be at least 2 letters');
            } else if (/[0-9]/.test(e.target.value) || /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e.target.value)) {
              setIsFirstnameValid(false);
              setFirstnameError('Firstname must not contain symbols or numbers');
            } else {
              setIsFirstnameValid(true);
              setUser({ ...user, Firstname: e.target.value });
            }
          };
          const handleLastname = (e) => {
            if (e.target.value.length < 3) {
              setIsLastnameValid(false);
              setLastnameError('Lastname must be at least 2 letters');
            } else if (/[0-9]/.test(e.target.value) || /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e.target.value)) {
              setIsLastnameValid(false);
              setLastnameError('Lastname must not contain symbols or numbers');
            } else {
              setIsLastnameValid(true);
              setUser({ ...user, Lastname : e.target.value });
            }
          };
          const validateEmail = (e) => {
            if (validator.isEmail(e.target.value)) {
              setIsMailValid(true);
              setUser({ ...user, Mail: e.target.value });
            } else {
              setIsMailValid(false);
            }
          };
          const handlePhoneNumber = (numberValue) => {   
              setUser({ ...user, PhoneNumber : numberValue });
              setIsPhoneNumberValid(true);
          };
          const handleBirthdate = (date) => {  
            setUser({ ...user, Birthdate : date });
            setIsBirthdateValid(true);
        };
        const SignUpResult = useSelector((state) => state.userReducer.user);
        const handleConfirm = (e) => {
            e.preventDefault();
            dispatch(register(user ));
          };
          
        React.useEffect(() => {
            if (  IsFirstnameValid  && 
                  IsLastnameValid &&  
                  IsMailValid && 
                  IsPasswordValid && 
                  IsCPasswordValid && 
                  IsPhoneNumberValid && 
                  IsBirthdateValid &&
                  IsFileValid )
            {
              setIsFormValid(true);
            }
            else 
            {
              setIsFormValid(false);
            }

        }, [  IsFirstnameValid,
              IsLastnameValid, 
              IsMailValid, 
              IsPasswordValid, 
              IsCPasswordValid, 
              IsPhoneNumberValid,
              IsBirthdateValid,
              IsFileValid]);
        React.useEffect (() => {
          if(SignUpResult.status === "200")
          {
            alert("Account created successfully !!");
            handleSignUpClick(); 
            window.location.reload()
          }
        }, [SignUpResult])

    //************** Image handler *************************** */
    const [Image, setImage] = React.useState({
        name :"",
        url :""
    });
    const LinkImage = useSelector((state) =>state.userReducer.imagelink );
    const [Update, setUpdate] = React.useState(0);

    
        React.useEffect(() => {
            if(Image.name !== "" && Image.url !== "")
            {
                dispatch(uploadImage(Image))
            }
        }, [Image]);

        React.useEffect(() => {
            if(LinkImage.length !== 0){
                setUser({ ...user, Image: LinkImage.link })
                setUpdate(Update+1);      
            }
        },[LinkImage])
    
      const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend  = () => {       
            setImage({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , url : reader.result});
            setIsFileValid(true);
        }    
      };

    /******************** password handler************************************ */
    const[pass , setpassword]= useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };  
      const handlePassword = (e) => {
        if (e.target.value.length < 8) {
          setIsPasswordValid(false);
          setPasswordError('Password must contain at least 8 character');
          setpassword(e.target.value);
        } else if ( !/[0-9]/.test(e.target.value)) {
          setIsPasswordValid(false);
          setPasswordError('Password must contain at least one number');
          setpassword(e.target.value);
        } else if(!/[A-Z]/.test(e.target.value)) {
          setIsPasswordValid(false);
          setPasswordError('Password must contain at least one uppercase character');
          setpassword(e.target.value);
        }else if(!/[a-z]/.test(e.target.value)) {
          setIsPasswordValid(false);
          setPasswordError('Password must contain at least one lowercase character');
          setpassword(e.target.value);
        }
        else {
          setIsPasswordValid(true);
          setpassword(e.target.value);
        }
      };
      const handleConfirmPassword = (e) => {   
        setUser({ ...user, HashedPassword : e.target.value });
        
    };  
    React.useEffect(() => {
      if (user.HashedPassword !== pass)
        {
          setIsCPasswordValid(false);
          setCPasswordError('Passwords are not the same');
        } else
        {
          setIsCPasswordValid(true);
        }
  }, [user.HashedPassword]);


    /************************************************************************** */
      

    return( 
    <>
        {!isShowSignUp ?
        <div className={`${props.isShowSignUp ? "active" : ""} show`}>
            <div className="signup-form">
                <div className="form-box solid">
                    <form>
                        <h1 className="login-text">Sign up</h1>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop : '10%' , marginBottom : '10%'}}>
                            <Grid item xs={6}>
                                <TextField  
                                    label="Firstname" 
                                    variant="standard" 
                                    sx={{
                                        display : 'flex',
                                        justifyContent : 'center',
                                        marginBottom : '10%'
                                    }}                                   
                                    onChange={handleFirstname}
                                    onBlur={() => setFirstnameTouched(true)}
                                />
                                {FirstnameTouched && (
                                  <h5 className="about-heading" style={{ color: IsFirstnameValid ? 'green' : 'red' }}>
                                    {IsFirstnameValid ? '✅' : FirstnameError}
                                  </h5>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField  
                                        label="Lastname" 
                                        variant="standard" 
                                        sx={{
                                            display : 'flex',
                                            justifyContent : 'center',
                                            marginBottom : '10%'
                                        }}
                                        onChange={handleLastname}
                                        onBlur={() => setLastnameTouched(true)}
                                    />
                                    {LastnameTouched && (
                                      <h5 className="about-heading" style={{ color: IsLastnameValid ? 'green' : 'red' }}>
                                        {IsLastnameValid ? '✅' : LastnameError}
                                      </h5>
                                    )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField  
                                        label="Email" 
                                        variant="standard" 
                                        sx={{
                                            display : 'flex',
                                            justifyContent : 'center',
                                        }}
                                        onChange={validateEmail}
                                        onBlur={() => setMailTouched(true)}
                                    />
                                    {MailTouched && (
                                      <h5 className="about-heading" style={{ color: IsMailValid ? 'green' : 'red' }}>
                                        {IsMailValid ? '✅' : 'Mail not valid'}
                                      </h5>
                                    )}
                            </Grid>
                            <Grid item xs={6}>
                                <PhoneInput
                                    country={'tn'}
                                    inputProps={{
                                        required: true,
                                    }}
                                    label="Phone Number"
                                    value={user.PhoneNumber}
                                    onChange={handlePhoneNumber}
                                />
                            
                            </Grid>
                            <Grid item xs={6}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['DatePicker']}>
                                      <DatePicker 
                                          label="Birthdate"
                                          onChange={handleBirthdate}
                                          value={user.Birthdate} 
                                      />
                                  </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <label>Image : </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Grid>
                            <Grid item xs={6} >
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
                                    value={pass}
                                    onChange={handlePassword}
                                    onBlur={() => setPasswordTouched(true)}
                                />
                                </FormControl>
                                {PasswordTouched && (
                                      <h5 className="about-heading" style={{ color: IsPasswordValid ? 'green' : 'red' }}>
                                        {IsPasswordValid ? '✅' : PasswordError}
                                      </h5>
                                    )}
                            </Grid>
                            <Grid item xs={6} >
                              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
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
                                    onChange={handleConfirmPassword}
                                    onBlur={() => setCPasswordTouched(true)}
                                />
                                </FormControl>
                                  {CPasswordTouched && (
                                      <h5 className="about-heading" style={{ color: IsCPasswordValid ? 'green' : 'red' }}>
                                        {IsCPasswordValid ? '✅' : CPasswordError}
                                      </h5>
                                  )}
                            </Grid>
                            
                            <Grid item xs={6}>
                        <Button 
                            variant="contained" 
                            onClick={handleConfirm}
                            disabled={!IsFormValid}
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
                            onClick={handleSignUpClick}
                            >Retourner</Button>
                    </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div> : null}
    </>
    );
}
export default SignUpForm ; 