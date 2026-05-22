# ⚙️ Guía de Configuración

## Requisitos Previos

- **Node.js** v14 o superior
- **npm** o **yarn**
- **MySQL** v5.7 o superior
- **Git** (opcional)

---

## Paso 1: Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Backend_CertiNova
```

---

## Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias especificadas en `package.json`:
- express
- mysql2
- bcrypt
- express-session
- dotenv
- nodemon (dev)

---

## Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
touch .env
```

Agrega las siguientes variables:

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_DATABASE=certinova
PORT_DB=3306

# Seguridad
TOKEN_SECRET=tu_clave_secreta_muy_segura_12345

# Puerto del Servidor (opcional)
PORT=5000
```

### Variables Explicadas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Host del servidor MySQL | localhost |
| `DB_USER` | Usuario de MySQL | root |
| `DB_PASSWORD` | Contraseña de MySQL | password123 |
| `DB_DATABASE` | Nombre de la base de datos | certinova |
| `PORT_DB` | Puerto de MySQL | 3306 |
| `TOKEN_SECRET` | Clave secreta para sesiones | abc123xyz789 |

---

## Paso 4: Crear Base de Datos

### Opción A: Usar MySQL CLI

```bash
mysql -u root -p
```

```sql
CREATE DATABASE certinova;
USE certinova;
```

### Opción B: Usar MySQL Workbench

1. Abre MySQL Workbench
2. Crea una nueva conexión (si no existe)
3. Ejecuta:
```sql
CREATE DATABASE certinova;
```

---

## Paso 5: Crear Tablas

Ejecuta las siguientes queries para crear las tablas:

```sql
-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Solicitudes
CREATE TABLE solicitudes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo_solicitud VARCHAR(100),
    estado ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Pagos
CREATE TABLE pagos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
    referencia VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

---

## Paso 6: Iniciar el Servidor

### Modo Desarrollo (con recarga automática)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

Deberías ver en la consola:
```
Base de datos conectada 🚀
Servidor corriendo en http://localhost:5000/api
```

---

## Verificar la Instalación

Abre tu navegador o usa curl para verificar:

```bash
curl http://localhost:5000/api
```

Deberías recibir el archivo `index.html` como respuesta.

---

## Problemas Comunes

### Error: "Cannot find module 'express'"
**Solución:** Ejecuta `npm install`

### Error: "Connection refused" (Base de datos)
**Solución:** Verifica que:
- MySQL está corriendo
- Las credenciales en `.env` son correctas
- El host y puerto son accesibles

### Error: Puerto 5000 ya está en uso
**Solución:** 
```bash
# Encuentra qué proceso usa el puerto
lsof -i :5000

# O cambia el puerto en server.js
```

---

## Próximos Pasos

1. Lee [API.md](./API.md) para conocer los endpoints disponibles
2. Revisa [DATABASE.md](./DATABASE.md) para entender el esquema
3. Consulta [ARCHITECTURE.md](./ARCHITECTURE.md) para la estructura del código

---

## Soporte

Si tienes problemas durante la configuración, revisa [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
