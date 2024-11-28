import React from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebaseConfig';

const Login = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
      const idToken = await user.getIdToken(); // Get Firebase ID token
      // Send the ID token to the backend
      await fetch('http://localhost:4000/api/v1/auth/students/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
