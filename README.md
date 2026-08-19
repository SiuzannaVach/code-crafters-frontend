# 🚀 Code Crafters

Plataforma web para descubrir, crear y gestionar eventos tecnológicos — online y presenciales. Proyecto final individual del bootcamp **Factoría F5 (FemCoders BCN, Promoción 9)**.

> Inspirado en plataformas como [Meetup](https://meetup.com) y [Eventbrite](https://eventbrite.com), pensado para la comunidad tech.

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Herramientas y flujo de trabajo](#-herramientas-y-flujo-de-trabajo)
- [Arquitectura](#-arquitectura)
- [Modelo de datos](#-modelo-de-datos)
- [Funcionalidades](#-funcionalidades)
- [Instalación](#-instalación)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Diseño](#-diseño)
- [Metodología de trabajo](#-metodología-de-trabajo)
- [Roadmap](#-roadmap)
- [Autora](#-autora)

---

## 💡 Sobre el proyecto

Code Crafters es una red social enfocada en eventos tecnológicos, donde cualquier usuario puede:

- **Como organizador:** crear y gestionar eventos, ver estadísticas de rendimiento y comunicarse con los inscritos.
- **Como espectador:** descubrir eventos por categoría o tecnología, inscribirse fácilmente y recibir notificaciones sobre cambios.

Es un proyecto **100% frontend**, sin backend — toda la persistencia de datos se gestiona mediante `localStorage`, simulando el comportamiento de una API real a través de React Context.

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React** | Librería principal de UI |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Vite** | Bundler y servidor de desarrollo |
| **SCSS Modules** | Estilos con alcance local por componente |
| **React Router** | Navegación entre páginas |
| **React Context API** | Gestión de estado global (Auth, Eventos, Notificaciones) |
| **localStorage** | Persistencia de datos sin backend |

---

## 🧰 Herramientas y flujo de trabajo

| Fase | Herramienta | Uso |
|---|---|---|
| Gestión ágil | **Jira** | Backlog de 17 user stories organizadas en 3 sprints (Scrum) |
| Diseño UI (borrador) | **Google Stitch** | Generación inicial de wireframes a partir de prompts |
| Diseño UI (final) | **Figma** | Refinamiento de mockups, design system, versiones desktop/mobile |
| Control de versiones | **Git + GitHub** | Historial de commits, control de ramas |
| Entorno de desarrollo | **Visual Studio Code** | Editor principal, con ESLint + Prettier |
| Documentación | **Markdown** | README, historias de usuario y arquitectura documentados |

---

## 🏗 Arquitectura

El proyecto sigue una arquitectura de 4 capas, pensada para funcionar sin backend:

```
┌─────────────────────┐
│  PAGES & ROUTING     │  Login · Home · Detail · Dashboards
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  STATE & CONTEXT     │  AuthContext · EventContext · NotificationContext
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  LOGIC FLOWS         │  Registro/Login · Creación de evento · Inscripción
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  DATA PERSISTENCE    │  localStorage Sync (useEffect)
└─────────────────────┘
```

- **AuthContext** — gestiona la sesión del usuario (login, registro, logout)
- **EventContext** — gestiona el listado y CRUD de eventos
- **NotificationContext** — gestiona alertas y recordatorios
- **localStorage Sync** — cada contexto sincroniza sus cambios automáticamente: escribe en cada cambio de estado (`useEffect` + `JSON.stringify`) y lee al iniciar la app (`JSON.parse`)

📄 Diagrama completo de arquitectura disponible en el archivo Figma del proyecto (ver sección [Diseño](#-diseño)).

---

## 🗄 Modelo de datos

Cuatro entidades principales, tipadas con TypeScript y persistidas en `localStorage`:

```typescript
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
}

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  modalidad: 'online' | 'presencial';
  ubicacion: string;
  categoria: string;
  organizadorId: string;
  vistas: number;
}

interface Inscripcion {
  id: string;
  eventoId: string;
  usuarioId: string;
  fechaInscripcion: string;
}

interface Notificacion {
  id: string;
  usuarioId: string;
  tipo: 'cambio_evento' | 'recordatorio' | 'nuevo_evento';
  mensaje: string;
  leida: boolean;
  fecha: string;
}
```

---

## ✨ Funcionalidades

### Rol Organizador
- ✅ Crear, editar y eliminar eventos
- ✅ Ver listado de inscritos por evento
- ✅ Consultar estadísticas (visualizaciones, registros, conversión)
- ✅ Dashboard con todos sus eventos

### Rol Espectador
- ✅ Buscar y filtrar eventos por categoría, modalidad, fecha o tecnología
- ✅ Ver el detalle completo de un evento
- ✅ Inscribirse y cancelar inscripción
- ✅ Ver sus eventos inscritos (próximos y pasados)
- ✅ Recibir notificaciones de cambios y recordatorios

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SiuzannaVach/code-crafters-frontend.git
cd code-crafters-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

---

## 📁 Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (Button, Card, Modal...)
├── pages/          # Páginas completas (Home, Dashboard, EventDetail...)
├── context/         # AuthContext, EventContext, NotificationContext
├── hooks/          # Custom hooks (useAuth, useEvents...)
├── types/          # Interfaces TypeScript (Usuario, Evento, Inscripción...)
├── utils/          # Funciones auxiliares (storage, validadores...)
├── data/           # Datos mock iniciales
├── routes/         # Configuración de React Router
└── styles/         # Variables y mixins SCSS globales
```

---

## 🎨 Diseño

Los mockups del proyecto fueron diseñados con **Google Stitch** y refinados en **Figma**, incluyendo versiones desktop y mobile (responsive).

🔗 [Ver diseño en Figma](https://www.figma.com/design/wpyDTIOsgePtRJlMg9XFOu/Code_Crafters)

---

## 📌 Metodología de trabajo

Proyecto desarrollado siguiendo **Scrum** de forma individual:

- **Backlog:** 17 historias de usuario, con criterios de aceptación y estimación en story points
- **Sprints:** 3 sprints de una semana cada uno
  - `Sprint 1` — MVP Core & Auth
  - `Sprint 2` — Management & Filters
  - `Sprint 3` — Notifications & Analytics
- **Tablero:** gestionado en Jira, con seguimiento de estado por tarea (`To do` → `In progress` → `Done`)
- **Control de versiones:** commits atómicos por historia de usuario, siguiendo [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`)

---

## 🗺 Roadmap

- [x] Definición de arquitectura y user stories
- [x] Diseño de mockups (Figma)
- [ ] Sprint 1 — Autenticación y MVP Core
- [ ] Sprint 2 — Gestión de eventos y filtros
- [ ] Sprint 3 — Notificaciones y estadísticas
- [ ] Despliegue

---

## 👩‍💻 Autora

**Siuzanna Vachaganian**
Fullstack Developer en formación — Factoría F5 (FemCoders BCN, Promoción 9)

Proyecto individual desarrollado de principio a fin: definición de arquitectura, historias de usuario, diseño UI/UX, y desarrollo frontend completo en React + TypeScript.

- 💼 GitHub: [@SiuzannaVach](https://github.com/SiuzannaVach)
- 🔗 LinkedIn: [linkedin.com/in/siuzannavach](https://linkedin.com/in/siuzannavach)
- 📧 Email: siuzannavach@gmail.com

---

<p align="center">
  Hecho con 💜 por Siuzanna Vachaganian — Factoría F5, Promoción 9
</p>