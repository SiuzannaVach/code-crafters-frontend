import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { mockUsuarios } from '../../data/mockData';
import styles from './LoginCard.module.scss';
import { Mail, Lock, LogIn } from 'lucide-react';

export const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('espectador');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.clear(); 

    const dbUser = mockUsuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!dbUser) {
      setError('Usuario no encontrado');
      return;
    }

    if (dbUser.password !== password) {
      setError('Contraseña incorrecta');
      return;
    }

    const userSession = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.nombre,
      role: role,
      isAuthenticated: true
    };

    localStorage.setItem('logged_user', JSON.stringify(userSession));
    console.log('SUCCESS_AUTH:', userSession);

    if (role === 'administrador') {
      navigate('/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        
        <div className={styles.titleBlock}>
          <h1 className={styles.mainFormTitle}>Bienvenido de nuevo</h1>
          <p className={styles.subtitle}>Inicia sesión en tu cuenta de Code Crafters</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium p-3 rounded-xl text-center mb-4">
            {error}
          </div>
        )}

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
                placeholder="admin@codecrafters.com"
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
          <Link to="/register" className={styles.registerLink}>
            Regístrate
          </Link>
        </div>

      </div>
    </div>
  );
};
