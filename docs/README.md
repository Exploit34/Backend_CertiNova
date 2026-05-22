# 📚 Documentación del Proyecto Backend CertiNova

## Descripción General

**Backend CertiNova** es una aplicación backend construida con **Node.js** y **Express** que proporciona un sistema de autenticación de usuarios, gestión de solicitudes y procesamiento de pagos para certificaciones.

### Características Principales

✅ **Autenticación de Usuarios** - Sistema seguro de login y registro con contraseñas encriptadas  
✅ **Control de Roles** - Roles de administrador y usuario con middleware de autorización  
✅ **Gestión de Solicitudes** - API para crear y consultar solicitudes  
✅ **Procesamiento de Pagos** - Módulo para procesar pagos de certificados  
✅ **Base de Datos MySQL** - Almacenamiento seguro de datos de usuarios  

---

## Información Técnica

| Propiedad | Valor |
|-----------|-------|
| **Framework** | Express.js 5.2.1 |
| **Runtime** | Node.js |
| **Base de Datos** | MySQL 2 |
| **Puerto** | 5000 |
| **Seguridad** | Bcrypt, Express Sessions |
| **Variables de Entorno** | .env (dotenv) |

---

## Estructura del Proyecto

```
Backend_CertiNova/
├── docs/                    # Documentación del proyecto
├── public/                  # Archivos estáticos (CSS)
├── src/
│   ├── controllers/         # Lógica de negocio
│   ├── repositories/        # Acceso a datos
│   ├── middleware/          # Middleware de autenticación
│   ├── route/               # Definición de rutas
│   ├── views/               # Vistas HTML
│   └── database/            # Configuración de BD
├── server.js                # Archivo principal
└── package.json             # Dependencias del proyecto
```

---

## Guía Rápida

### 1. Instalación
```bash
npm install
```

### 2. Configuración
Crea un archivo `.env` con las siguientes variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_DATABASE=certinova
PORT_DB=3306
TOKEN_SECRET=tu_secreto_jwt
```

### 3. Iniciar el servidor
```bash
npm start          # Producción
npm run dev        # Desarrollo (con nodemon)
```

El servidor estará disponible en: `http://localhost:5000/api`

---

## Documentación Complementaria

- 📖 [SETUP.md](./SETUP.md) - Instrucciones detalladas de configuración
- 🔌 [API.md](./API.md) - Documentación de endpoints
- 💾 [DATABASE.md](./DATABASE.md) - Esquema de base de datos
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Instrucciones de despliegue
- 🔧 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Solución de problemas comunes

---

## Stack Tecnológico

### Backend
- **Express.js** - Framework web
- **Node.js** - Runtime de JavaScript
- **MySQL2** - Cliente de base de datos
- **Bcrypt** - Encriptación de contraseñas
- **Express-session** - Gestión de sesiones

### Desarrollo
- **Nodemon** - Reinicio automático en desarrollo
- **Dotenv** - Manejo de variables de entorno

---

## Flujo de Autenticación

1. Usuario se registra con email, nombre, teléfono y contraseña
2. Contraseña se encripta con bcrypt (10 rounds)
3. Datos se guardan en la base de datos
4. En login, se valida email y contraseña
5. Se crea una sesión con el email y rol del usuario
6. Usuario es redirigido según su rol (admin o user)

---

## Soporte y Contribuciones

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

**Última actualización:** Mayo 2026
