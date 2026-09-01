import React from 'react';
import styles from '../../pages/Home/Home.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const HomePrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={`${styles.hero__btn} ${styles['hero__btn--primary']}`} {...props}>
    {children}
  </button>
);

export const HomeOutlineButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={`${styles.hero__btn} ${styles['hero__btn--outline']}`} {...props}>
    {children}
  </button>
);

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active: boolean;
}

export const HomeFilterChip: React.FC<ChipProps> = ({ children, active, ...props }) => (
  <button
    className={`${styles.filters__chip} ${active ? styles['filters__chip--active'] : ''}`}
    {...props}
  >
    {children}
  </button>
);

export const HomeDetailsButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles['card__btnDetails']} {...props}>
    {children}
  </button>
);
