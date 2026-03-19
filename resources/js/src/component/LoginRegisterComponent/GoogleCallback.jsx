import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const passwordSet = params.get('password_set') === 'true';

      if (!token) {
        alert('Google login failed');
        return;
      }

      localStorage.setItem('token', token);

      if (!passwordSet) {
        navigate('/set-password');
      } else {
        navigate('/dashboard');
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Logging in with Google...</div>;
}