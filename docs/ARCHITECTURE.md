# 🏗️ Arquitectura del Proyecto

## Descripción General de la Arquitectura

Backend CertiNova utiliza una arquitectura **MVC (Model-View-Controller)** con separación de capas, siguiendo patrones de desarrollo clean code.

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Server                         │
│                  (server.js - Port 5000)                    │
└────────────┬─────────────────────────────────────┬──────────┘
             │                                     │
             ▼                                     ▼
    ┌─────────────────┐              ┌──────────────────────┐
    │  Static Files   │              │   API Routes         │
    │  (public/)      │              │   (/src/route)       │
    └─────────────────┘              └──────────┬───────────┘
                                                 │
                        ┌────────────────────────┼─────────────────┐
                        │                        │                 │
                        ▼                        ▼                 ▼
                ┌────────────────┐      ┌─────────────────┐  ┌──────────────┐
                │  Middleware    │      │  Controllers    │  │   Views      │
                │  (Auth Logic)  │      │  (Business)     │  │   (HTML)     │
                └────────────────┘      └────────┬────────┘  └──────────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │ Repositories    │
                                        │ (Data Access)   │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │   MySQL BD      │
                                        │                 │
                                        └─────────────────┘
```

---

## Estructura de Carpetas Detallada

```
Backend_CertiNova/
│
├── 📁 public/                          # Archivos estáticos
│   └── style.css                       # Estilos CSS
│
├── 📁 src/                             # Código fuente principal
│   │
│   ├── 📁 controllers/                 # Controladores (Lógica de negocio)
│   │   ├── login.js                    # Control de login
│   │   ├── register.js                 # Control de registro
│   │   ├── procesarPago.js             # Lógica de pagos
│   │   └── solicitudController.js      # Gestión de solicitudes
│   │
│   ├── 📁 repositories/                # Acceso a datos (DAO Pattern)
│   │   ├── loginRepository.js          # Queries de login
│   │   ├── registerRepository.js       # Queries de registro
│   │   └── solicitudRepository.js      # Queries de solicitudes
│   │
│   ├── 📁 middleware/                  # Funciones de middleware
│   │   ├── adminMiddleware.js          # Protección de rutas admin
│   │   └── userMiddleware.js           # Protección de rutas user
│   │
│   ├── 📁 database/                    # Configuración de BD
│   │   └── database.js                 # Conexión MySQL
│   │
│   ├── 📁 route/                       # Definición de rutas
│   │   └── routes.js                   # Todas las rutas de la app
│   │
│   └── 📁 views/                       # Templates HTML
│       ├── index.html                  # Página inicio
│       ├── login.html                  # Formulario login
│       ├── register.html               # Formulario registro
│       ├── admin.html                  # Panel admin
│       ├── user.html                   # Panel usuario
│       ├── success.html                # Página éxito
│       └── fail.html                   # Página error
│
├── server.js                           # Punto de entrada de la aplicación
├── package.json                        # Configuración npm y dependencias
├── .env                                # Variables de entorno
└── 📁 docs/                            # Documentación
```

---

## Capas de la Arquitectura

### 1. **Capa de Presentación (Views)**
Contiene los archivos HTML servidos al cliente.

**Archivos:**
- `index.html` - Página principal
- `login.html` - Formulario de autenticación
- `register.html` - Formulario de registro
- `admin.html` - Panel administrativo
- `user.html` - Panel de usuario
- `success.html` / `fail.html` - Páginas de resultado

**Responsabilidad:** Presentar interfaz al usuario

---

### 2. **Capa de Rutas (Routes)**
Mapea URLs a controladores específicos.

**Archivo:** `src/route/routes.js`

```javascript
router.post('/login', login);           // POST /api/login
router.post('/register', resgister);    // POST /api/register
router.get('/users', getAllUsers);      // GET /api/users
router.post('/solicitud', crearSolicitud); // POST /api/solicitud
```

**Responsabilidad:** Enrutar solicitudes HTTP a los controladores apropiados

---

### 3. **Capa de Middleware (Middleware)**
Funciones que se ejecutan antes de los controladores para validar acceso.

**Archivo:** `src/middleware/`

```javascript
// adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(401).send('No autorizado');
    }
    next();
};
```

**Responsabilidad:** 
- Autenticar usuarios
- Autorizar acceso basado en roles
- Validar datos de entrada

---

### 4. **Capa de Controladores (Controllers)**
Contiene la lógica de negocio de la aplicación.

**Archivos:**

#### `login.js`
```javascript
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await loginRepository(email, password);
        req.session.user = {
            email: usuario.email,
            role: usuario.role
        };
        // Redirigir según rol...
    } catch (error) {
        // Manejar errores...
    }
};
```

#### `register.js`
```javascript
const register = async (req, res) => {
    // Validar datos
    // Encriptar contraseña con bcrypt
    // Guardar usuario mediante repository
};
```

#### `procesarPago.js`
```javascript
const procesarPagos = async (req, res) => {
    // Lógica de procesamiento de pagos
};
```

#### `solicitudController.js`
```javascript
const crearSolicitud = async (req, res) => {
    // Crear solicitud en BD
};

const getAllUsers = async (req, res) => {
    // Obtener todos los usuarios
};
```

**Responsabilidad:** Procesar lógica de negocio

---

### 5. **Capa de Repositorios (Repositories)**
Acceso a datos mediante el patrón Repository/DAO.

**Archivos:**

#### `loginRepository.js`
```javascript
const loginRepository = async (email, password) => {
    // 1. Buscar usuario por email
    // 2. Comparar contraseña con bcrypt
    // 3. Retornar usuario o error
};
```

#### `registerRepository.js`
```javascript
const registerRepository = async (fullName, email, ...) => {
    // 1. Verificar email único
    // 2. Insertar usuario en BD
    // 3. Retornar resultado
};
```

#### `solicitudRepository.js`
```javascript
const crearSolicitudRepository = async (...) => {
    // Insertar solicitud en BD
};

const obtenerUsuariosRepository = async () => {
    // Obtener todos los usuarios
};
```

**Responsabilidad:** 
- Ejecutar queries SQL
- Manejar conexión a BD
- Retornar datos formateados

---

### 6. **Capa de Base de Datos**
Gestión de conexión a MySQL.

**Archivo:** `src/database/database.js`

```javascript
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT_DB
});

module.exports = connection;
```

**Responsabilidad:** Mantener conexión con MySQL

---

## Flujo de Datos - Ejemplo: Login

```
1. Usuario llena formulario en login.html
   ↓
2. Envía POST a /api/login con email y password
   ↓
3. server.js recibe la solicitud → routes.js
   ↓
4. routes.js enruta a loginController
   ↓
5. loginController extrae email y password del body
   ↓
6. Llama loginRepository(email, password)
   ↓
7. loginRepository busca usuario en BD MySQL
   ↓
8. Compara password hasheada con bcrypt
   ↓
9. Retorna usuario o error al controller
   ↓
10. Controller crea sesión: req.session.user = {...}
   ↓
11. Redirige a /api/admin o /api/user según rol
   ↓
12. Cliente recibe redirección y navega a nueva página
```

---

## Patrones de Diseño Utilizados

### 1. **MVC (Model-View-Controller)**
- **Views:** Archivos HTML
- **Controllers:** Contienen lógica
- **Models:** Representados por Repositories

### 2. **Repository Pattern (DAO)**
Abstrae el acceso a datos:
```javascript
// En el controller
const usuario = await loginRepository(email, password);

// En el repository
const loginRepository = async (email, password) => {
    // Detalles de la query
};
```

### 3. **Middleware Pattern**
Ejecuta funciones antes de llegar al controller:
```javascript
router.get('/admin', adminMiddleware, (req, res) => { ... });
```

### 4. **Session Pattern**
Almacena estado del usuario en sesión:
```javascript
req.session.user = { email, role };
```

---

## Tecnologías por Capa

| Capa | Tecnología | Propósito |
|------|-----------|----------|
| Presentación | HTML, CSS | Interfaz de usuario |
| Transporte | HTTP, Express.js | Comunicación cliente-servidor |
| Aplicación | Node.js, Express | Procesamiento de solicitudes |
| Lógica de Negocio | Controllers, Middleware | Validación y procesamiento |
| Acceso a Datos | MySQL2 | Conexión a BD |
| Almacenamiento | MySQL | Persistencia de datos |
| Seguridad | Bcrypt, Sessions | Autenticación y autorización |

---

## Dependencias y Sus Roles

```
express ^5.2.1          → Framework web principal
mysql2 ^3.22.3          → Driver de MySQL
bcrypt ^6.0.0           → Encriptación de contraseñas
express-session ^1.19.0 → Gestión de sesiones
dotenv ^17.4.2          → Variables de entorno
nodemon ^3.1.14 (dev)   → Reinicio automático en desarrollo
```

---

## Flujo de Seguridad

```
Request HTTP
    ↓
[Routes] - Validación de ruta
    ↓
[Middleware] - Autenticación/Autorización
    ↓
[Controller] - Validación de datos
    ↓
[Repository] - Query a BD
    ↓
[Database] - Operación segura
    ↓
Response
```

---

## Mejoras Arquitectónicas Sugeridas

1. **Agregar capa de Servicios** entre Controllers y Repositories
2. **Implementar DTOs** (Data Transfer Objects)
3. **Agregar Logger centralizado**
4. **Implementar Error Handling Global**
5. **Usar async/await consistentemente**
6. **Agregar tests unitarios**
7. **Implementar Validación con Joi o Yup**
