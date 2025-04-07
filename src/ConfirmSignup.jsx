import React, { useState } from 'react';
import { confirmSignUp } from '@aws-amplify/auth';

function ConfirmSignup({ email, onConfirmationSuccess }) {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');

  const handleConfirmSignup = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: otp,
      });
      setStatus('Account confirmed!');
      onConfirmationSuccess(); // move to upload page
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button onClick={handleConfirmSignup}>Confirm</button>
      <p>{status}</p>
    </div>
  );
}

export default ConfirmSignup;
