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
  onClose?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // Возвращаем назад, если открыто как отдельный экран
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    const userSession = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.fullName,
      role: data.accountType || 'espectador',
      isAuthenticated: true
    };

    localStorage.setItem('logged_user', JSON.stringify(userSession));

    // Разделение логики: организатор идет на дашборд, зритель — на главную
    if (data.accountType === 'organizador') {
      navigate('/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className={styles['register-modal']} onClick={handleClose}>
      <div className={styles['register-modal__body']} onClick={(e) => e.stopPropagation()}>
        
        {/* Кнопка-крестик закрытия */}
        <button
          type="button"
          className={styles['register-modal__close-btn']}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Шапка бренда внутри карточки */}
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
            <span className={styles['brand-header__subtitle-desktop']}>Únete al futuro de la tecnología.</span>
          </p>
        </div>

        {/* Форма регистрации */}
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

          {/* Редирект на логин */}
          <div className={styles['auth-card__redirect']}>
            ¿Ya tienes cuenta?{' '}
            <button
              type="button"
              className={styles['auth-card__link']}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
