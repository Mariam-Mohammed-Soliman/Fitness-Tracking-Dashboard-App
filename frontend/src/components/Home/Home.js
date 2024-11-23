import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const mastTextContent = `Where your journey to a healthier lifestyle begins! With our cutting-edge tools you can monitor every step, every calorie and your workout effortlessly Join a thriving community that inspires each other in achieving 
personal goals.`;


const ShimmerButton = () => {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button className='home-btn' data-effect="wave" onClick={() => navigate('/SignUp')}>
        <span className="text">Sign Up</span>
        <span className="shimmer"></span>
      </button>
      <button  className='home-btn signup-button'
        data-effect="wave"
        
        onClick={() => navigate('/SignIn')}
      >
        <span className="text">Sign In</span>
        <span className="shimmer"></span>
      </button>
    </div>
  );
};

const Background = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='home-body'>
    <div className="glow-container">
      <img
        src="https://i.ibb.co/QK6FJHv/photo-2024-10-01-11-41-11-removebg-preview.png"
        alt="Small Placeholder"
        className="small-image"
      />
      <div className="large-image">
        <dotlottie-player
          src="https://lottie.host/38650137-2890-4437-b4d5-c6b4403bebb2/GL2enz7DXY.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div className="welcome-container w-75">
        <div className="welcome-text">
          <h2>Welcome to Sportiva</h2>
          <p className="mast__text">{mastTextContent}</p>
          <ShimmerButton />
        </div>
      </div>
    </div>
    </div>
  );
};

function Home() {
  return <Background />;
}

export default Home;
