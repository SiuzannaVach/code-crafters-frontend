import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import styles from './styles/global.module.scss';

function App() {
  return (
    <HashRouter>
      <div className={styles.pageLayout}>
        <main className={styles.mainContent}>
          <AppRoutes />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
