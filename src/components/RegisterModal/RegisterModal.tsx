import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ChevronDown, Eye, EyeOff, ArrowRight, X } from 'lucide-react';
import styles from './RegisterModal.module.scss';
import logoIcon from '../../assets/icons/icon-code.svg';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  accountType: string;
}

interface RegisterModalProps {
  onNavigate?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    const userSession = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.fullName,
      role: data.accountType || 'espectador',
      isAuthenticated: true
    };

    localStorage.setItem('logged_user', JSON.stringify(userSession));

    if (data.accountType === 'organizador') {
      navigate('/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className={styles['register-modal']} onClick={() => onNavigate?.()}>

      <div className={styles['register-modal__body']} onClick={(e) => e.stopPropagation()}>

        <button
          className={styles['register-modal__close-btn']}
          onClick={() => onNavigate?.()}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className={styles['brand-header']}>
          <div className={styles['brand-header__logo-box']}>
            <img
              src={logoIcon}
              alt="Code Crafters Logo"
              className={styles['brand-header__logo-img']}
            />
          </div>
          <h1 className={styles['brand-header__title']}>Code Crafters</h1>
          <p className={styles['brand-header__subtitle']}>
            <span className={styles['brand-header__subtitle-mobile']}>Crea tu cuenta para empezar a construir.</span>
            <span className={styles['brand-header__subtitle-desktop']}>Úнете al futuro de la tecnología.</span>
          </p>
        </div>

        <div className={styles['auth-card']}>
          <h2 className={styles['auth-card__title']}>Crear Cuenta</h2>

          <form onSubmit={handleSubmit(onSubmit)} className={styles['auth-card__form']} autoComplete="off">

            <div className={styles['form-field']}>
              <label className={styles['form-field__label']} htmlFor="fullName">Nombre Completo</label>
              <div className={styles['form-field__control']}>
                <User size={18} className={styles['form-field__icon']} />
                <input
                  id="fullName"
                  type="text"
                  className={styles['form-field__input']}
                  placeholder="Nombre y apellido"
                  {...register('fullName', { required: true })}
                />
              </div>
            </div>

            <div className={styles['form-field']}>
              <label className={styles['form-field__label']} htmlFor="email">Dirección de Email</label>
              <div className={styles['form-field__control']}>
                <Mail size={18} className={styles['form-field__icon']} />
                <input
                  id="email"
                  type="email"
                  className={styles['form-field__input']}
                  placeholder="dev@codecrafters.com"
                  autoComplete="one-time-code"
                  {...register('email', { required: true })}
                />
              </div>
            </div>

            <div className={styles['form-field']}>
              <label className={styles['form-field__label']} htmlFor="password">Contraseña</label>
              <div className={styles['form-field__control']}>
                <Lock size={18} className={styles['form-field__icon']} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles['form-field__input']}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register('password', { required: true })}
                />
                <button
                  type="button"
                  className={styles['form-field__toggle-pass']}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={`${styles['form-field']} ${styles['form-field--account-type']}`}>
              <label className={styles['form-field__label']} htmlFor="accountType">Tipo de Cuenta</label>
              <div className={styles['form-field__control']}>
                <User size={18} className={styles['form-field__icon']} />
                <select id="accountType" className={styles['form-field__select']} {...register('accountType', { required: true })} defaultValue="">
                  <option value="" disabled hidden>SELECCIONAR</option>
                  <option value="espectador">Espectador</option>
                  <option value="organizador">Organizador</option>
                </select>
                <ChevronDown size={18} className={styles['form-field__select-arrow']} />
              </div>
            </div>

            <button type="submit" className={styles['auth-card__submit-btn']}>
              <span>CREAR CUENTA</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className={styles['auth-card__redirect']}>
            ¿Ya tienes cuenta?{' '}
            <a
              href="/login"
              className={styles['auth-card__link']}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.();
              }}
            >
              Inicia sesión aquí
            </a>
          </div>
        </div>

      </div>

      <footer className={styles['register-modal__footer']}>
        <div className={styles['register-modal__footer-brand']}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles['brand-header__logo-icon']}>
            <rect x="2" y="3" width="20" height="18" rx="4" />
            <path d="M7 9l3 3-3 3" />
            <path d="M12 15h5" />
          </svg>
          <span>Code Crafters</span>
        </div>
        <div className={styles['register-modal__copyright']}>
          © 2026 Code Crafters. Built for the future of tech.
        </div>
      </footer>

    </div>
  );
};
