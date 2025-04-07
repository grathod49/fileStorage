import React, { useState } from 'react';
import { signUp } from '@aws-amplify/auth';

function Signup({ onSwitch, onSignupSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSignup = async () => {
    try {
      await signUp({ username: email, password });
      setStatus('Signup successful! Check your email for OTP.');
      onSignupSuccess(email);  // Pass email to Confirmation page
    } catch (error) {
      setStatus('Signup failed: ' + error.message);
    }
  };

  return (
    <div class="auth-container">
      <h2>Signup</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Sign Up</button>
      <p>{status}</p>
      <p>
        Already have an account? <button onClick={onSwitch}>Login</button>
      </p>
    </div>
  );
}

export default Signup;
