import 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './styles/global.module.scss';
import { RegisterModal } from './components/RegisterModal/RegisterModal';

function App() {
  return (
    <div className={styles.pageLayout}>
     
      <Header isAuthenticated={true} />
      <RegisterModal />
       
      <main style={{ padding: '2rem', flex: '1' }}>
       
      </main>
      <Footer />
    </div>
  );
}

export default App;
