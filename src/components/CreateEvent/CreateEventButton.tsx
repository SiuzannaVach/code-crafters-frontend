import React from 'react';
import styles from '../../pages/CreateEvent/CreateEvent.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const CreateEventDraftButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button type="button" className={styles.draftButton} {...props}>
    {children}
  </button>
);

export const CreateEventPublishButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button type="submit" className={styles.publishButton} {...props}>
    {children}
  </button>
);
