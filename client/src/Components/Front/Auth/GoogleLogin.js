import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const CustomGoogleLoginButton = ({ onSuccess, onFailure }) => {
  const signIn  = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: '600478887173-0qfnf3jok9q28mqkjh6hrp12bjgpa5qo.apps.googleusercontent.com',
  });
  

  return (
    <button
        onClick={signIn}
      style={{
        backgroundColor: '#4285f4',
        color: '#ffffff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Login with Google
    </button>
  );
};

export default CustomGoogleLoginButton;