import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import splashAnimation from '../assets/splash.json'; // 👈 Replace with your Lottie file path

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // 3s duration
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="w-64 h-64">
        <Lottie animationData={splashAnimation} loop={false} />
      </div>
    </div>
  );
};

export default SplashScreen;
