import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      // Optionally, you can make an API call to notify the backend
      // await axios.post('http://localhost:5000/api/logout');
      
      // Remove the token from localStorage
      localStorage.removeItem('authToken');

      // Redirect to login page
      navigate('/login');
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
