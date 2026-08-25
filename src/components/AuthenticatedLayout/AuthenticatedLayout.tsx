import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'; 

import styles from './AuthenticatedLayout.module.scss';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header isAuthenticated={true} />

        <div className={styles.content}>
          <Outlet />
        </div>

        <Footer /> 
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
