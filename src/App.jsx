import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Login from './Login';
import Signup from './Signup';
import { signOut } from 'aws-amplify/auth';
import ConfirmSignup from './ConfirmSignup';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showConfirmSignup, setShowConfirmSignup] = useState(false);
  const [emailForConfirmation, setEmailForConfirmation] = useState('');

  const handleSignupSuccess = (email) => {
    setEmailForConfirmation(email);
    setShowConfirmSignup(true);  // Show OTP confirmation
  };

  const handleConfirmationSuccess = () => {
    setLoggedIn(true);
    setShowConfirmSignup(false);  // Hide OTP confirmation
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      alert('Signed out successfully!');
      alert('Signed out successfully!');
      navigate('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!loggedIn) {
    if (showConfirmSignup) {
      return <ConfirmSignup email={emailForConfirmation} onConfirmationSuccess={handleConfirmationSuccess} />;
    }

    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} onSignupSuccess={handleSignupSuccess} />
    ) : (
      <Login onSwitch={() => setShowSignup(true)} onLoginSuccess={() => setLoggedIn(true)} />
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
      <h1>Welcome! File Upload Enabled</h1>
      <FileUpload />
    </div>
  );
}

export default App;
