import React, { useState } from 'react';
import { signIn } from '@aws-amplify/auth';

function Login({ onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async () => {
    try {
      await signIn({ username: email, password });
      setStatus('Login successful!');
      onLoginSuccess();
    } catch (error) {
      setStatus('Login failed: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <p>{status}</p>
      <p>
        Don’t have an account? <button onClick={onSwitch}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
