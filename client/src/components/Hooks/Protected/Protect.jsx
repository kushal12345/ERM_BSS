import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import api from '../../../utils/api';

export const ProtectRoutes = ({ children }) => {
  const { cookies, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let location = useLocation();
  const inactivityTimeLimit = 300000; // 5 minutes (300,000 ms)

  useEffect(() => {
    //console.log(cookies.User);
    if (!cookies.user) {
      //console.log("No cookies found");
      setIsLoading(false);
      return;
    }else{
    // Check authentication
    api.post(`/api/protected`, { token: cookies.token, user: cookies.user })
      .then((res) => {
        if (res.data.success === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          logout();
        }
      })
      .catch((error) => {
        //console.log(error);
        setIsAuthenticated(false);
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      })};
  }, [cookies, location, logout]);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        logout(); // Call the logout function
      }, inactivityTimeLimit);
    };

    // Event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Initialize the timer on mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [logout]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};