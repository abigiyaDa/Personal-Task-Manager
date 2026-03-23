import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../assets/dashboard.png';

export default function LandingPage(){
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className='landing-container'>
      {/* header */}

      <header className='landing-header'>
        {/* the logo */}
        <div className='logo'> LOGO</div>

        {/* 2buttons in in the header  */}
        <div className='header-buttons'>
          <button className='btn-transparent' onClick={handleLogin}>
            Login
          </button>
          <button className='btn-colored' onClick={handleSignup} > 
            Sign Up
          </button>
        </div>
      </header>

      {/*  main section */}
      <main className='landing-main'>
        <h1>Where productivity meets simplicity</h1>
        <p>
          Organize tasks, manage priorities, and streamline your workflow with a simple
          and intelligent system designed to keep you productive.
        </p>
        <img className='dashboard-image' src={dashboardImage} alt="Dashboard-image" />
      </main>
    </div>
  )
}