import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <h2 className={styles.footer__brand}>Code Crafters</h2>
        <p className={styles.footer__copyright}>
          &copy; 2026 Code Crafters. Built for the future of tech.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
