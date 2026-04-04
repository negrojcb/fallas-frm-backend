# Fallas FRM Backend

API REST para gestionar falleros y pagos de una comisión fallera.

## Stack

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors
- nodemon

## Instalación

```bash
git clone <URL_DEL_REPO_BACKEND>
cd fallas-frm-backend
npm install
```

## Variables de entorno

Crear un archivo `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://usuario@localhost:5432/fallas_frm_db
JWT_SECRET=tu_clave_secreta
```

## Base de datos

Crear la base:

```sql
CREATE DATABASE fallas_frm_db;
```

Ejecutar el schema:

```bash
psql fallas_frm_db -f sql/schema.sql
```

## Scripts

```bash
npm run dev
npm start
```

## Endpoints principales

### Health check

- `GET /`
- `GET /test-db`

### Falleros

- `GET /api/falleros`
- `GET /api/falleros/:id`
- `POST /api/falleros`
- `PUT /api/falleros/:id`
- `PUT /api/falleros/:id/toggle-active`

### Filtros

- `GET /api/falleros?search=garcia`
- `GET /api/falleros?activo=true`
- `GET /api/falleros?activo=false`
- `GET /api/falleros?comision=mayor`
- `GET /api/falleros?comision=infantil`

### Pagos

- `POST /api/falleros/:id/pagos`
- `PUT /api/pagos/:pagoId`
- `DELETE /api/pagos/:pagoId`

## Comisión calculada

La comisión no se guarda en base de datos.  
Se calcula a partir de la fecha de nacimiento:

- `infantil`: menor de 14 años
- `mayor`: 14 años o más

## Deploy

Backend en producción:

`https://fallas-frm-backend.onrender.com`

## Próximas mejoras

- endpoint `GET /api/pagos/:pagoId`
- bunyols en detalle del fallero
- validaciones más completas
- tests unitarios
- autenticación y autorización
