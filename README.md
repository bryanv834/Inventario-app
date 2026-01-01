# Inventario App (Fullstack) — React + Express + PostgreSQL + Prisma

Aplicación web fullstack para la **gestión de inventario** con:
- Autenticación (Registro/Login) con **JWT**
- **CRUD** de Productos (Crear, Leer, Actualizar, Eliminar)
- Control de stock con **Movimientos (IN/OUT)** + Historial
- Reporte de **Stock Bajo**
- Frontend **responsive** con React + Tailwind (estilo futurista glass/neon)

---

##  Tecnologías

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt (hash de contraseñas)
- zod (validación)
- cors / helmet / morgan / dotenv
- nodemon (modo desarrollo)

### Frontend
- React (Vite)
- TailwindCSS
- Axios
- React Router DOM

---

## Estructura del proyecto

```
inventario-app/
  backend/
  frontend/
  db/
  docs/
    screenshots/
  README.md
  .gitignore
```

---

## Requisitos previos

- Node.js (recomendado LTS)
- npm
- PostgreSQL instalado y corriendo
- Git (para subir a GitHub)

---

## Configuración de base de datos (PostgreSQL)

1. Crea una base de datos (ejemplo: `inventario`).
2. Asegúrate de tener usuario/contraseña y puerto.

Ejemplo de conexión:
- host: `localhost`
- port: `5432`
- db: `inventario`

---

## Variables de entorno

### Backend: `backend/.env`
Crea el archivo `backend/.env` (NO se sube a GitHub):

```env
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/inventario?schema=public"
JWT_SECRET="una_clave_super_secreta"
PORT=4000
```

> Cambia `USUARIO`, `CONTRASENA` y el nombre de la BD.

### Frontend: `frontend/.env`
Crea `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000
```

---

## Instalación y ejecución

### 1) Backend

En una terminal:

```bash
cd backend
npm install
```

Migraciones Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

Ejecutar backend:

```bash
npm run dev
```

Debería iniciar en: `http://localhost:4000`

---

### 2) Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Debería abrir en: `http://localhost:5173`

---

## Pruebas rápidas (API)

> Todas las rutas protegidas requieren header:
`Authorization: Bearer <TOKEN>`

### 1) Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"brayan@test.com\",\"password\":\"123456\"}"
```

La respuesta devuelve un `token`.

### 2) Listar productos
```bash
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer Mi_token"
```

### 3) Crear un producto
```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d "{\"name\":\"Coca Cola 500ml\",\"sku\":\"CC500\",\"price\":2.5,\"stock\":10,\"minStock\":3}"
```

---

## Endpoints principales

### Auth
- `POST /api/auth/register` → registra usuario
- `POST /api/auth/login` → login y token
- `GET /api/me` → datos del usuario autenticado

### Productos (CRUD)
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Movimientos
- `GET /api/movements`
- `GET /api/movements?type=IN|OUT`
- `GET /api/movements?productId=<id>`
- `POST /api/movements` (crea movimiento IN/OUT y actualiza stock)

### Reportes
- `GET /api/reports/low-stock` → productos con `stock <= minStock`

---

## Uso de la aplicación (Frontend)

1. Abre `http://localhost:5173`
2. Inicia sesión o regístrate
3. Secciones:
   - **Productos**: crear, editar, eliminar y ver lista
   - **Movimientos**: registrar IN/OUT y ver historial
   - **Stock Bajo**: ver productos con stock bajo

---

## Capturas (Screenshots)

### Login
![Login](docs/screenshots/login.png)

### Registro
![Registro](docs/screenshots/register.png)

### Productos (CRUD)
![Productos](docs/screenshots/products.png)

### Editar producto
![Editar producto](docs/screenshots/edit-product.png)

### Movimientos (IN/OUT + historial)
![Movimientos](docs/screenshots/movements.png)

### Reporte Stock Bajo
![Stock Bajo](docs/screenshots/low-stock.png)

---

## Notas de seguridad
- El token JWT se guarda en `localStorage` para mantener sesión.

---

## Solución de problemas

### Pantalla en blanco (React Router / React duplicado)
- Borra `node_modules` y reinstala:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error Prisma / DB
- Verifica `DATABASE_URL` y que PostgreSQL esté corriendo.
- Ejecuta:
```bash
npx prisma migrate dev
npx prisma generate
```

### CORS / Network Error
- Verifica que el backend esté en `http://localhost:4000`
- Verifica `frontend/.env` con `VITE_API_URL=http://localhost:4000`
- Reinicia `npm run dev` del frontend

---

## Autor
- Brayan
