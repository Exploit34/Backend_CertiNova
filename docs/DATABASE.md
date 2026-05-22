# 💾 Documentación de Base de Datos

## Descripción General

La base de datos MySQL para CertiNova utiliza tres tablas principales para gestionar usuarios, solicitudes y pagos. Todas las tablas están conectadas mediante claves foráneas.

---

## Tablas

### 1. Tabla: `usuarios`

Almacena la información de los usuarios del sistema.

**Definición:**
```sql
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
```

**Estructura de Columnas:**

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del usuario |
| `fullName` | VARCHAR(100) | NOT NULL | Nombre completo del usuario |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Email único del usuario |
| `phone` | VARCHAR(20) | NOT NULL | Número de teléfono |
| `company` | VARCHAR(100) | NULLABLE | Empresa del usuario |
| `password` | VARCHAR(255) | NOT NULL | Contraseña encriptada con bcrypt |
| `role` | ENUM('user','admin') | DEFAULT 'user' | Rol del usuario en el sistema |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

**Índices:**
```sql
-- Email es único (ya está en la definición)
ALTER TABLE usuarios ADD UNIQUE INDEX idx_email (email);
```

**Ejemplo de Registro:**
```json
{
    "id": 1,
    "fullName": "Juan Pérez García",
    "email": "juan@example.com",
    "phone": "1234567890",
    "company": "Empresa XYZ",
    "password": "$2b$10$...(hash bcrypt)",
    "role": "user",
    "created_at": "2024-01-15 10:30:00"
}
```

---

### 2. Tabla: `solicitudes`

Almacena las solicitudes de certificación realizadas por los usuarios.

**Definición:**
```sql
CREATE TABLE solicitudes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo_solicitud VARCHAR(100),
    estado ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

**Estructura de Columnas:**

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único de la solicitud |
| `usuario_id` | INT | NOT NULL, FOREIGN KEY | ID del usuario que crea la solicitud |
| `tipo_solicitud` | VARCHAR(100) | NULLABLE | Tipo de solicitud (ej: certificado_profesional) |
| `estado` | ENUM | DEFAULT 'pendiente' | Estado actual de la solicitud |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

**Relaciones:**
```
solicitudes.usuario_id → usuarios.id (ON DELETE CASCADE)
```

**Ejemplo de Registro:**
```json
{
    "id": 5,
    "usuario_id": 1,
    "tipo_solicitud": "certificado_profesional",
    "estado": "pendiente",
    "created_at": "2024-01-15 11:00:00"
}
```

---

### 3. Tabla: `pagos`

Almacena los registros de pagos realizados por los usuarios.

**Definición:**
```sql
CREATE TABLE pagos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
    referencia VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

**Estructura de Columnas:**

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del pago |
| `usuario_id` | INT | NOT NULL, FOREIGN KEY | ID del usuario que realiza el pago |
| `monto` | DECIMAL(10, 2) | NOT NULL | Monto del pago (máximo 99,999,999.99) |
| `estado` | ENUM | DEFAULT 'pendiente' | Estado del pago |
| `referencia` | VARCHAR(100) | NULLABLE | Referencia de la transacción externa |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

**Relaciones:**
```
pagos.usuario_id → usuarios.id (ON DELETE CASCADE)
```

**Ejemplo de Registro:**
```json
{
    "id": 12,
    "usuario_id": 1,
    "monto": 50.00,
    "estado": "completado",
    "referencia": "TXN2024011501",
    "created_at": "2024-01-15 11:30:00"
}
```

---

## Diagrama de Relaciones (ER)

```
┌─────────────────┐
│    usuarios     │
├─────────────────┤
│ id (PK)         │
│ fullName        │
│ email (UNIQUE)  │
│ phone           │
│ company         │
│ password        │
│ role            │
│ created_at      │
└────────┬────────┘
         │ (1:N)
         ├─────────────────────┬─────────────────┐
         │                     │                 │
         ▼                     ▼                 ▼
┌──────────────────┐  ┌──────────────────┐
│   solicitudes    │  │     pagos        │
├──────────────────┤  ├──────────────────┤
│ id (PK)          │  │ id (PK)          │
│ usuario_id (FK)  │  │ usuario_id (FK)  │
│ tipo_solicitud   │  │ monto            │
│ estado           │  │ estado           │
│ created_at       │  │ referencia       │
└──────────────────┘  │ created_at       │
                      └──────────────────┘
```

---

## Queries Útiles

### Obtener un usuario por email
```sql
SELECT * FROM usuarios WHERE email = 'juan@example.com';
```

### Obtener todas las solicitudes de un usuario
```sql
SELECT * FROM solicitudes WHERE usuario_id = 1;
```

### Obtener todos los pagos completados
```sql
SELECT * FROM pagos WHERE estado = 'completado';
```

### Contar solicitudes pendientes
```sql
SELECT COUNT(*) FROM solicitudes WHERE estado = 'pendiente';
```

### Obtener ingresos totales
```sql
SELECT SUM(monto) FROM pagos WHERE estado = 'completado';
```

### Obtener usuarios registrados en los últimos 7 días
```sql
SELECT * FROM usuarios 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
```

### Obtener solicitudes con datos del usuario
```sql
SELECT 
    s.id,
    s.tipo_solicitud,
    s.estado,
    s.created_at,
    u.fullName,
    u.email,
    u.company
FROM solicitudes s
JOIN usuarios u ON s.usuario_id = u.id;
```

### Obtener pagos con datos del usuario
```sql
SELECT 
    p.id,
    p.monto,
    p.estado,
    p.referencia,
    p.created_at,
    u.fullName,
    u.email
FROM pagos p
JOIN usuarios u ON p.usuario_id = u.id;
```

---

## Migraciones y Respaldos

### Crear un Respaldo (Backup)
```bash
mysqldump -u root -p certinova > backup_certinova_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar desde un Respaldo
```bash
mysql -u root -p certinova < backup_certinova_20240115_103000.sql
```

---

## Configuración de Conexión

El archivo `src/database/database.js` configura la conexión:

```javascript
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT_DB
});
```

---

## Optimización

### Índices Recomendados
```sql
-- Índice en email (ya existe como UNIQUE)
CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email);

-- Índice en usuario_id para solicitudes
CREATE INDEX idx_solicitudes_usuario_id ON solicitudes(usuario_id);

-- Índice en usuario_id para pagos
CREATE INDEX idx_pagos_usuario_id ON pagos(usuario_id);

-- Índice en estado para filtros rápidos
CREATE INDEX idx_solicitudes_estado ON solicitudes(estado);
CREATE INDEX idx_pagos_estado ON pagos(estado);
```

### Ejecutar Índices
```sql
-- Conectarse a la base de datos
USE certinova;

-- Crear los índices
CREATE INDEX idx_solicitudes_usuario_id ON solicitudes(usuario_id);
CREATE INDEX idx_pagos_usuario_id ON pagos(usuario_id);
CREATE INDEX idx_solicitudes_estado ON solicitudes(estado);
CREATE INDEX idx_pagos_estado ON pagos(estado);
```

---

## Consideraciones de Seguridad

✓ Las contraseñas se almacenan **hasheadas** con bcrypt  
✓ El email es único para evitar duplicados  
✓ Las claves foráneas tienen `ON DELETE CASCADE` para integridad referencial  
✓ Se recomienda usar SSL para conexiones a la BD en producción  
✓ Limitar permisos de usuarios de BD a nivel de base de datos

---

## Mejoras Futuras

- Agregar tabla de auditoría para registrar cambios
- Implementar soft deletes (columna `deleted_at`)
- Agregar tabla de logs de acceso
- Implementar particionamiento por fecha para tablas grandes
