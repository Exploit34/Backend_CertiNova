# 🔌 Documentación de API

## Base URL

```
http://localhost:5000/api
```

---

## Autenticación

El sistema utiliza **Express Sessions** para mantener las sesiones de usuario. Después de un login exitoso, la sesión se mantiene en el servidor.

### Estructura de Sesión
```javascript
req.session.user = {
    email: "usuario@example.com",
    role: "admin" // o "user"
}
```

---

## Endpoints

### 1. Páginas Públicas

#### GET `/`
Retorna la página de inicio.

**Respuesta:** HTML (index.html)
```
Status: 200
```

---

#### GET `/login`
Retorna la página de login.

**Respuesta:** HTML (login.html)
```
Status: 200
```

---

#### GET `/register`
Retorna la página de registro.

**Respuesta:** HTML (register.html)
```
Status: 200
```

---

#### GET `/success`
Retorna la página de éxito.

**Respuesta:** HTML (success.html)
```
Status: 200
```

---

### 2. Autenticación

#### POST `/login`
Autentica un usuario.

**Request Body:**
```json
{
    "email": "usuario@example.com",
    "password": "contraseña123"
}
```

**Respuesta Exitosa:**
```
Status: 302 Redirect
Location: /api/admin  (si es admin)
Location: /api/user   (si es usuario normal)
```

**Respuesta con Error (Credenciales Inválidas):**
```json
{
    "error": "Email o contraseña incorrectos"
}
Status: 401
```

**Respuesta con Error (Servidor):**
```json
{
    "error": "Error interno"
}
Status: 500
```

---

#### POST `/register`
Registra un nuevo usuario.

**Request Body:**
```json
{
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "1234567890",
    "company": "Empresa XYZ",
    "password": "contraseña123",
    "confirmPassword": "contraseña123"
}
```

**Validaciones:**
- ✓ Todos los campos requeridos (fullName, email, phone, password, confirmPassword)
- ✓ Contraseña mínimo 8 caracteres
- ✓ Teléfono mínimo 10 caracteres
- ✓ Las contraseñas deben coincidir
- ✓ Email único en la base de datos

**Respuesta Exitosa:**
```json
{
    "success": true,
    "message": "Usuario registrado exitosamente"
}
Status: 201
```

**Respuesta con Error:**
```json
{
    "success": false,
    "message": "Todos los campos son requeridos."
}
Status: 400
```

---

### 3. Rutas Protegidas

#### GET `/admin`
Retorna el panel de administración (solo para admins).

**Middleware:** `adminMiddleware`

**Respuesta Exitosa:** HTML (admin.html)
```
Status: 200
```

**Respuesta Sin Autorización:**
```
Status: 401 o Redirect a login
```

---

#### GET `/user`
Retorna el panel de usuario (solo para usuarios autenticados).

**Middleware:** `userMiddleware`

**Respuesta Exitosa:** HTML (user.html)
```
Status: 200
```

**Respuesta Sin Autorización:**
```
Status: 401 o Redirect a login
```

---

### 4. Gestión de Usuarios

#### GET `/users`
Obtiene la lista de todos los usuarios.

**Respuesta Exitosa:**
```json
[
    {
        "id": 1,
        "fullName": "Juan Pérez",
        "email": "juan@example.com",
        "phone": "1234567890",
        "company": "Empresa XYZ",
        "role": "user",
        "created_at": "2024-01-15T10:30:00"
    },
    {
        "id": 2,
        "fullName": "Admin Usuario",
        "email": "admin@example.com",
        "phone": "0987654321",
        "company": null,
        "role": "admin",
        "created_at": "2024-01-10T08:00:00"
    }
]
Status: 200
```

**Respuesta con Error:**
```json
{
    "error": "Error al obtener usuarios"
}
Status: 500
```

---

### 5. Solicitudes

#### POST `/solicitud`
Crea una nueva solicitud.

**Request Body:**
```json
{
    "tipo_solicitud": "certificado_profesional",
    "usuario_id": 1
}
```

**Respuesta Exitosa:**
```json
{
    "success": true,
    "message": "Solicitud creada exitosamente",
    "solicitud_id": 5
}
Status: 201
```

**Respuesta con Error:**
```json
{
    "error": "No se pudo crear la solicitud"
}
Status: 500
```

---

### 6. Pagos

#### GET `/pago-certificado`
Procesa un pago de certificado.

**Query Parameters:**
```
GET /pago-certificado?usuario_id=1&monto=50.00
```

**Respuesta Exitosa:**
```json
{
    "success": true,
    "message": "Pago procesado correctamente",
    "transaccion_id": "TXN12345",
    "monto": 50.00
}
Status: 200
```

**Respuesta con Error:**
```json
{
    "error": "No se pudo procesar el pago"
}
Status: 500
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 302 | Redirect - Redirección |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autorizado |
| 403 | Forbidden - Acceso prohibido |
| 404 | Not Found - No encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Headers Comunes

### Request
```
Content-Type: application/json
Cookie: connect.sid=<session_id>
```

### Response
```
Content-Type: application/json
Set-Cookie: connect.sid=<session_id>
```

---

## Ejemplos con cURL

### Registrar Usuario
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "1234567890",
    "company": "Empresa XYZ",
    "password": "contraseña123",
    "confirmPassword": "contraseña123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "contraseña123"
  }' \
  -c cookies.txt
```

### Obtener Usuarios
```bash
curl http://localhost:5000/api/users
```

### Crear Solicitud
```bash
curl -X POST http://localhost:5000/api/solicitud \
  -H "Content-Type: application/json" \
  -d '{
    "tipo_solicitud": "certificado_profesional",
    "usuario_id": 1
  }'
```

---

## Errores Comunes

### 401 Unauthorized
**Causa:** Usuario no autenticado o sesión expirada

**Solución:** Hacer login nuevamente

### 403 Forbidden
**Causa:** Usuario sin permisos para acceder al recurso

**Solución:** Verificar rol del usuario

### 500 Internal Server Error
**Causa:** Error del servidor

**Solución:** Revisar logs del servidor

---

## Rate Limiting

Actualmente no hay rate limiting implementado. Se recomienda agregar en producción usando `express-rate-limit`.

---

## Seguridad

- ✓ Las contraseñas se encriptan con bcrypt (10 rounds)
- ✓ Las sesiones se almacenan del lado del servidor
- ✓ CSRF protection recomendada para producción
- ✓ HTTPS recomendado para producción
