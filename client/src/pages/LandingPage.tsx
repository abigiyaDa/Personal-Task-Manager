import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../assets/dashboard.png';

export default function LandingPage(){
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className='landing-container'>
      {/* header */}

      <header className='landing-header'>
        <div className='logo'> LOGO</div>
        
      </header>
    </div>
  )
}