import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './styles/global.module.scss';

function App() {
  return (
    <div className={styles.pageLayout}>
      {/* Верхняя панель навигации */}
      <Header isAuthenticated={true} />
      
      {/* Сюда мы будем вставлять настоящие страницы или карточки событий */}
      <main style={{ padding: '2rem', flex: '1' }}>
        {/* Текст удален. Теперь здесь пустое рабочее пространство */}
      </main>

      {/* Нижняя панель */}
      <Footer />
    </div>
  );
}

export default App;
