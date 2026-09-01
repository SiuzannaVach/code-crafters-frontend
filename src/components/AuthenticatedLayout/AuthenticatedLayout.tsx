import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'; 

import styles from './AuthenticatedLayout.module.scss';

const AuthenticatedLayout: React.FC = () => {
  const location = useLocation();
  

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const isMobileEventPage = location.pathname.includes('/events/') && windowWidth < 768;

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header isAuthenticated={true} />

        <div className={styles.content}>
          <Outlet />
        </div>

     
        {!isMobileEventPage && <Footer />}

      </div>
    </div>
  );
};

export default AuthenticatedLayout;
