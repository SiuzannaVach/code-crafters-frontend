import type { ButtonHTMLAttributes } from 'react'; 
import { Pencil, Trash2 } from 'lucide-react';
import styles from '../../pages/Dashboard/Dashboard.module.scss';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button: React.FC<BaseButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button type="button" className={`${styles.btnCreate} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const ActionButton: React.FC<BaseButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button type="button" className={`${styles.actionBtn} ${className}`} {...props}>
      {children === 'Editar' && <Pencil size={14} />}
      {children}
    </button>
  );
};

export const DeleteButton: React.FC<BaseButtonProps> = ({ className = '', ...props }) => {
  return (
    <button type="button" className={`${styles.btnDelete} ${className}`} {...props}>
      <Trash2 size={14} />
    </button>
  );
};
