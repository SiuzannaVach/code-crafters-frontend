import React, { useState } from 'react';
import styles from './LoginCard.module.scss';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginCardProps {
  onNavigate?: () => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('espectador');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intento de inicio de sesión:', { email, password, role });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        
        <div className={styles.titleBlock}>
          <h1 className={styles.mainFormTitle}>Bienvenido de nuevo</h1>
          <p className={styles.subtitle}>Inicia sesión en tu cuenta de Code Crafters</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label htmlFor="role">SELECT</label>
            <div className={styles.inputWrapper}>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.selectInput}
              >
                <option value="espectador">Espectador</option>
                <option value="administrador">Administrador</option>
              </select>
              <span className={styles.selectArrow}>▼</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">DIRECCIÓN DE EMAIL</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                placeholder="dev@codecrafters.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">CONTRASEÑA</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión <LogIn size={18} />
          </button>
        </form>

        <div className={styles.footerLink}>
          ¿No tienes cuenta?{' '}
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.();
            }}
          >
            Regístrate
          </a>
        </div>

      </div>
    </div>
  );
};
