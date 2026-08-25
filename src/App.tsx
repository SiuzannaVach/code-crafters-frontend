import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import styles from './styles/global.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.pageLayout}>
        <main className={styles.mainContent}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
