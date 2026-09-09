# 🚀 Code Crafters

[![Ver Demo en vivo](https://shields.io)](https://github.io)

Plataforma web para descubrir, crear y gestionar eventos tecnológicos — online y presenciales. Proyecto final individual del bootcamp **Factoría F5 (FemCoders BCN, Promoción 9)**.

> Inspirado en plataformas como [Meetup](https://meetup.com) y [Eventbrite](https://eventbrite.com), pensado para la comunidad tech.

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Herramientas y flujo de trabajo](#-herramientas-y-flujo-de-trabajo)
- [Arquitectura](#-arquitectura)
- [Control de acceso basado en roles](#-control-de-acceso-basado-en-roles-rbac)
- [Aislamiento de datos de usuario](#-aislamiento-de-datos-de-usuario-en-localstorage)
- [Modelo de datos](#-modelo-de-datos)
- [Funcionalidades](#-funcionalidades)
- [Características avanzadas de UI/UX](#-características-avanzadas-de-uiux)
- [Calidad del código y Clean Code](#-calidad-del-código-y-clean-code)
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

| Tecnología            | Uso                                                      |
| --------------------- | -------------------------------------------------------- |
| **React**             | Librería principal de UI                                 |
| **TypeScript**        | Tipado estático en todo el proyecto                      |
| **Vite**              | Bundler y servidor de desarrollo                         |
| **SCSS Modules**      | Estilos con alcance local por componente                 |
| **React Router**      | Navegación entre páginas                                 |
| **React Context API** | Gestión de estado global (Auth, Eventos, Notificaciones) |
| **localStorage**      | Persistencia de datos sin backend                        |

---

## 🧰 Herramientas y flujo de trabajo

| Fase                  | Herramienta            | Uso                                                              |
| --------------------- | ---------------------- | ---------------------------------------------------------------- |
| Gestión ágil          | **Jira**               | Backlog de 17 user stories organizadas en 3 sprints (Scrum)      |
| Diseño UI (borrador)  | **Google Stitch**      | Generación inicial de wireframes a partir de prompts             |
| Diseño UI (final)     | **Figma**              | Refinamiento de mockups, design system, versiones desktop/mobile |
| Control de versiones  | **Git + GitHub**       | Historial de commits, control de ramas                           |
| Entorno de desarrollo | **Visual Studio Code** | Editor principal, con ESLint + Prettier                          |
| Documentación         | **Markdown**           | README, historias de usuario y arquitectura documentados         |

---

## 🏗 Arquitectura

El proyecto sigue una arquitectura de 4 capas, pensada para funcionar sin backend:

```
┌─────────────────────┐
│  PAGES & ROUTING     │  Login · Home · Detail · Dashboards
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  STATE & CONTEXT     │  EventContext · NotificationContext · sesión
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  LOGIC FLOWS         │  Registro/Login · Creación de evento · Inscripción
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│  DATA PERSISTENCE    │  localStorage · eventos personalizados
└─────────────────────┘
```

- **authStorage** — centraliza la sesión (`logged_user`), el login, el registro y el logout
- **EventContext** — gestiona el listado y CRUD de eventos
- **NotificationContext** — gestiona alertas y recordatorios
- **eventRegistration** — encapsula las claves de inscripción por usuario y los eventos de sincronización
- **localStorage Sync** — los datos se leen y escriben mediante utilidades tipadas; los eventos personalizados mantienen reactivas las vistas en la misma pestaña

📄 Diagrama completo de arquitectura disponible en el archivo Figma del proyecto (ver sección [Diseño](#-diseño)).

---

## 🔐 Control de Acceso Basado en Roles (RBAC)

El acceso y la interfaz se adaptan a la sesión almacenada en `logged_user`. Las rutas de gestión comprueban el rol antes de mostrar contenido administrativo o permitir acciones sensibles.

### Organizador / Administrador

- Accede al Dashboard **«Resumen del Organizador»**, con contadores dinámicos de eventos, registros y asistentes.
- Puede crear, editar y eliminar eventos.
- Puede editar tanto eventos creados por el usuario como eventos mock; las modificaciones se guardan como datos persistidos para que prevalezcan sobre el contenido inicial.
- Visualiza la fotografía circular de perfil en el header y en el bloque de bienvenida del Dashboard.
- La ruta `/create-event` está protegida: los usuarios que no tienen un rol organizador o administrador son redirigidos a `/my-events`.

### Espectador / Usuario autenticado

- Puede explorar el catálogo y consultar el detalle de cada evento.
- Puede inscribirse y cancelar su inscripción.
- Dispone de la vista exclusiva **«MIS EVENTOS»**, que muestra únicamente sus propias inscripciones.
- La interfaz se recalcula al cambiar de sesión. Por ejemplo, cuando entra una nueva usuaria como ANNA, no se reutilizan las inscripciones ni el estado visual de la sesión anterior.
- En el header se muestra una iconografía circular de usuario; dentro de las páginas se pueden mostrar las iniciales dinámicas de la persona autenticada.

### Invitado / Visitante

- Puede consultar la navegación y el contenido público en modo de solo lectura.
- Las acciones de inscripción se muestran deshabilitadas o con la indicación **«Inicia sesión»**, evitando que una persona no autenticada modifique datos.
- En **«MIS EVENTOS»** se muestra un bloque informativo con el acceso directo **«Iniciar Sesión»** hacia `/login`.
- El header utiliza una iconografía circular de usuario en lugar de iniciales o datos personales.

---

## 🔒 Aislamiento de Datos de Usuario en `localStorage`

Las inscripciones están aisladas por usuario para impedir que dos cuentas compartan accidentalmente el mismo estado en un navegador.

- La clave ya no es global por evento. `getRegistrationKey()` genera una clave con el identificador de la sesión activa:

  ```text
  code_crafters_event_inscribed_${currentUserId}_${eventId}
  ```

- `isEventRegistered()` comprueba únicamente la clave asociada al usuario actualmente autenticado.
- `useMyEvents` filtra los eventos mediante esa misma clave y no puede mostrar inscripciones pertenecientes a otra cuenta.
- Al ejecutar **«Cerrar Sesión»**, `clearSession()` elimina `logged_user` y emite `auth-session-changed`. Las vistas que dependen de la sesión vuelven a calcular su estado, evitando que queden botones, tarjetas o contadores de la persona anterior.
- Las altas y cancelaciones emiten eventos de sincronización para que Home, EventDetail y MyEvents se actualicen sin recargar el navegador.

---

## 🗄 Modelo de datos

Cuatro entidades principales, tipadas con TypeScript y persistidas en `localStorage`:

```typescript
interface Usuario {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "espectador" | "organizador";
}

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  modalidad: "online" | "presencial";
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
  tipo: "cambio_evento" | "recordatorio" | "nuevo_evento";
  mensaje: string;
  leida: boolean;
  fecha: string;
}
```

---

## ✨ Funcionalidades

### Rol Organizador

- ✅ Crear, editar y eliminar eventos
- ✅ Consultar estadísticas dinámicas del Dashboard
- ✅ Editar eventos creados y sobrescribir eventos mock
- ✅ Gestionar el catálogo de eventos desde la vista administrativa

### Rol Espectador

- ✅ Buscar y filtrar eventos por categoría, modalidad, fecha o tecnología
- ✅ Ver el detalle completo de un evento
- ✅ Inscribirse y cancelar inscripción
- ✅ Ver únicamente sus eventos inscritos en «MIS EVENTOS»
- ✅ Recibir notificaciones de creación, inscripción y cancelación

### Rol Invitado / Visitante

- ✅ Explorar el contenido público
- ✅ Ver los detalles de los eventos
- ✅ Recibir una interfaz segura con las acciones restringidas
- ✅ Acceder directamente al login desde las acciones bloqueadas

---

## 🚀 Características Avanzadas de UI/UX

### Centro de notificaciones sincronizado

El header incluye un centro de notificaciones interactivo con indicador de elementos no leídos, lista de mensajes, acción para marcar como leídos y limpieza de notificaciones. Las operaciones relevantes generan avisos en español y se mantienen separadas en `NotificationContext`.

La sincronización entre componentes utiliza eventos del navegador:

- `local-storage-update` fuerza una comprobación inmediata después de una cancelación.
- `code-crafters:registration-changed` comunica qué evento cambió.
- `auth-session-changed` informa a la aplicación de un login o logout.

Esto permite que el botón de inscripción en Home, la tarjeta de Explorar y el botón de EventDetail cambien de estado de forma reactiva, incluso cuando el cambio ocurre en la misma pestaña y el evento nativo `storage` no se dispara automáticamente.

### Diseño Vía Láctea / Aurora Boreal

La página **«MIS EVENTOS»** mantiene el fondo general oscuro del sitio, pero aplica el tratamiento visual cósmico a su propia superficie:

- Gradientes radiales de púrpura, azul profundo y verde/turquesa neón.
- Brillos difuminados mediante pseudo-elementos, `filter: blur(...)` y opacidad controlada.
- Tarjetas con gradiente interno, borde de «polvo estelar», sombra violeta y efecto de cristal mediante `backdrop-filter: blur`.
- Diseño responsive para escritorio y móvil, con separación basada en variables SCSS globales.
- Estado vacío y estado de visitante claramente diferenciados, sin bloques artificiales ni contenido de demostración innecesario.

### Avatares e identidad visual

- El header muestra una fotografía circular para Organizador/Administrador.
- Espectadores y visitantes ven una iconografía circular de usuario con brillo violeta/turquesa, sin iniciales en la barra superior.
- En los bloques de bienvenida de las páginas, la aplicación calcula las iniciales a partir de `logged_user.name`; para una persona visitante utiliza `IN`.
- La fotografía y las iniciales tienen estilos independientes para mantener una jerarquía visual coherente entre navegación y contenido.

---

## 🧼 Calidad del Código y Clean Code

La implementación sigue una separación clara de responsabilidades:

- `src/hooks/useMyEvents/useMyEvents.ts` contiene la lectura de inscripciones, estados de carga y error, cancelación, navegación y notificaciones. `MyEvents.tsx` se limita a presentar el estado y mapear las tarjetas.
- `EventContext` centraliza el catálogo, los eventos mock y las sobrescrituras persistidas de eventos editados.
- `eventRegistration.ts` concentra la generación de claves, la comprobación de inscripción y los eventos de sincronización.
- `authStorage.ts` centraliza la lectura, guardado y eliminación de la sesión.
- Las páginas contienen composición y presentación; los estilos están encapsulados en módulos SCSS.

Todo el código de aplicación utiliza TypeScript estricto. Se eliminaron usos de `any` en favor de interfaces y tipos explícitos como `Evento`, `StoredUser` y estados de dominio. Los datos externos, incluido el JSON de `localStorage`, se procesan con comprobaciones y tipos seguros antes de utilizarse.

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

## 🚀 Despliegue y Demo

[![Ver Demo en vivo](https://shields.io)](https://github.io)

El proyecto está preparado para desplegarse en **GitHub Pages** y funciona completamente con `localStorage` del navegador actual. Los datos de la sesión, eventos, inscripciones y notificaciones se mantienen de forma local en ese navegador.

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
