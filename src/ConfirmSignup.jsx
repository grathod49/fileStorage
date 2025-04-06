import React, { useState } from 'react';
import { confirmSignUp } from '@aws-amplify/auth';

function ConfirmSignup({ email, onConfirmationSuccess }) {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');

  const handleConfirmSignup = async () => {
    try {
      await confirmSignUp(email, otp);
      setStatus('Confirmation successful!');
      onConfirmationSuccess();
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleConfirmSignup}>Confirm</button>
      <p>{status}</p>
    </div>
  );
}

export default ConfirmSignup;
