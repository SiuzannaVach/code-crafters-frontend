import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

import { mockUsuarios } from "../../data/mockData";
import {
  findUserByEmail,
  saveNewUser,
  type StoredUser,
} from "../../utils/authStorage";
import { notifySessionChange } from "../../utils/sessionEvents";
import styles from "./LoginCard.module.scss";

type Role = "espectador" | "organizador";

export const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("espectador");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // 1. Look for a registered user in localStorage.
    const registeredUser = findUserByEmail(cleanEmail);

    // 2. If none exists, look for the admin in mockData.
    const mockUser = mockUsuarios.find(
      (user) => user.email.toLowerCase() === cleanEmail,
    );

    let dbUser: StoredUser | undefined = registeredUser;

    if (!dbUser && mockUser) {
      dbUser = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.nombre,
        password: mockUser.password,
        role: mockUser.role === "organizador" ? "organizador" : "espectador",
      };
    }

    // 3. Create and persist the user when necessary.
    if (!dbUser) {
      dbUser = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        name: cleanEmail.split("@")[0].toUpperCase(),
        password,
        role,
      };

      saveNewUser(dbUser);
    } else if (dbUser.password !== password) {
      setError("Contraseña incorrecta");
      return;
    }

    // Read the role from the saved user.
    // The test admin always has the organizador role.
    const finalRole: Role =
      dbUser.email === "admin@codecrafters.com" ? "organizador" : dbUser.role;

    // 4. Save the current session.
    localStorage.setItem(
      "logged_user",
      JSON.stringify({
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: finalRole,
        isAuthenticated: true,
      }),
    );
    notifySessionChange();

    // 5. Redirect based on the role.
    navigate(finalRole === "organizador" ? "/dashboard" : "/home");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.titleBlock}>
          <h1 className={styles.mainFormTitle}>Bienvenido de nuevo</h1>
          <p className={styles.subtitle}>
            Inicia sesión en tu cuenta de Code Crafters
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="role">SELECT</label>

            <div className={styles.inputWrapper}>
              <select
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
                className={styles.selectInput}
              >
                <option value="espectador">Espectador</option>
                <option value="organizador">Administrador</option>
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@codecrafters.com"
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión <LogIn size={18} />
          </button>
        </form>

        <div className={styles.footerLink}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" className={styles.registerLink}>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
