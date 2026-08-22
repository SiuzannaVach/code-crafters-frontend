import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './styles/global.module.scss';
import { RegisterModal } from './components/RegisterModal/RegisterModal';
import { LoginCard } from './components/Login/LoginCard';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  
  useEffect(() => {
    if (window.location.hash === '#register') {
      setIsRegisterOpen(true);
    }
  }, []);

  const handleNavigateToRegister = () => {
    window.location.hash = 'register';
    setIsRegisterOpen(true);
  };

  return (
    <div className={styles.pageLayout}>
      <Header isAuthenticated={true} />

      <main className={styles.mainContent}>
        
        <LoginCard onNavigate={handleNavigateToRegister} />

      
        {isRegisterOpen && <RegisterModal key="fixed-overlay-modal" />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
