# Fallas FRM Backend

REST API built to manage falleros and payments for a falla commission.

## Stack

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors
- nodemon

## Installation

```bash
git clone <BACKEND_REPO_URL>
cd fallas-frm-backend
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://USER@localhost:5432/DATABASE_NAME
ADMIN_USER=admin
ADMIN_PASSWORD=your_admin_password
```

## Database

Create the database:

```sql
CREATE DATABASE fallas_frm_db;
```

Run the schema:

```bash
psql fallas_frm_db -f sql/schema.sql
```

## Scripts

```bash
npm run dev
npm start
```

## Main Endpoints

### Health check

- `GET /`
- `GET /test-db`

### Auth

- `POST /api/auth/login`

### Falleros

- `GET /api/falleros`
- `GET /api/falleros/:id`
- `POST /api/falleros`
- `PUT /api/falleros/:id`
- `PUT /api/falleros/:id/toggle-active`

### Filters

- `GET /api/falleros?search=garcia`
- `GET /api/falleros?dni=12345678A`
- `GET /api/falleros?activo=true`
- `GET /api/falleros?activo=false`
- `GET /api/falleros?comision=mayor`
- `GET /api/falleros?comision=infantil`

### Payments

- `POST /api/falleros/:id/pagos`
- `PUT /api/pagos/:pagoId`
- `DELETE /api/pagos/:pagoId`

## Computed Commission

Commission is not stored in the database.
It is computed from the birth date:

- `infantil`: under 14 years old
- `mayor`: 14 years old or older

## Computed Bunyols

Bunyols are also computed values.
They are derived from the fallero `fecha_alta` and displayed in the fallero detail response.

## Authentication

The backend includes a simple admin login endpoint.

- credentials are validated against environment variables
- successful login returns a basic admin user object
- current implementation is intended for MVP/demo purposes

## Deploy

Production backend:

`https://fallas-frm-backend.onrender.com`

## Next Improvements

- `GET /api/pagos/:pagoId` endpoint
- stronger validations for business rules and input formats
- unit tests
- full backend route protection with real authentication/authorization
