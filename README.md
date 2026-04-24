# Zimple Barbería

Sistema de reservas para barberías — MVP.

## Requisitos previos

- [Node.js](https://nodejs.org/) v22+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) v24+
- [npm](https://www.npmjs.com/) v10+ (incluido con Node.js)
- `openssl` (incluido en macOS/Linux; en Windows usar Git Bash o WSL)

## Arranque rápido

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd Barberia
```

### 2. Configurar variables de entorno

```bash
# Variables de infraestructura (Docker Compose)
cp .env.example .env

# Variables del backend
cp backend/.env.example backend/.env

# Variables del frontend
cp frontend/.env.example frontend/.env.local
```

Editar cada `.env` con los valores reales. En desarrollo los valores por
defecto funcionan sin modificaciones adicionales.

### 3. Generar claves JWT (RS256)

```bash
mkdir -p backend/certs
openssl genrsa -out backend/certs/private.pem 4096
openssl rsa -in backend/certs/private.pem -pubout -out backend/certs/public.pem
```

### 4. Levantar la infraestructura

```bash
docker compose -f infra/docker-compose.yml --env-file .env up -d
```

Esperar a que Postgres esté healthy (unos segundos) y verificar:

| Servicio      | URL                      | Descripción                  |
|---------------|--------------------------|------------------------------|
| PostgreSQL    | `localhost:5433`         | Base de datos principal      |
| n8n           | `http://localhost:5678`  | Orquestador de workflows     |
| Evolution API | `http://localhost:8080`  | Gateway WhatsApp             |
| Adminer       | `http://localhost:8081`  | Inspector visual de la BD    |

### 5. Instalar dependencias

```bash
npm install
```

### 6. Inicializar la base de datos (Prisma)

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
cd ..
```

### 7. Inicializar shadcn/ui

shadcn/ui se instala copiando componentes al proyecto, no como paquete npm.

```bash
cd frontend
npx shadcn-ui@latest init
cd ..
```

### 8. Iniciar los servidores de desarrollo

En terminales separadas:

```bash
# Terminal 1 — Backend (puerto 3001)
npm run dev:backend

# Terminal 2 — Frontend (puerto 3000)
npm run dev:frontend
```

---

## Comandos útiles

```bash
# Linting
npm run lint
npm run lint:fix

# Formateo
npm run format
npm run format:check

# Tests unitarios (backend)
cd backend && npm test

# Tests e2e con Playwright (requiere backend y frontend corriendo)
cd frontend && npm run test:e2e

# Prisma Studio — inspector visual de la BD
cd backend && npm run db:studio

# Generar cliente Prisma después de cambiar schema.prisma
cd backend && npm run db:generate

# Ver logs de los contenedores
docker compose -f infra/docker-compose.yml logs -f

# Detener contenedores
docker compose -f infra/docker-compose.yml down

# Detener y eliminar volúmenes (borra todos los datos)
docker compose -f infra/docker-compose.yml down -v
```

---

## Estructura del proyecto

```
├── backend/        API REST — Fastify + TypeScript + Prisma
│   ├── src/        Código fuente
│   ├── prisma/     Schema y migraciones
│   └── certs/      Claves JWT (no versionadas)
├── frontend/       Dashboard web — Next.js 14 + Tailwind + shadcn/ui
│   └── src/app/    App Router de Next.js 14
├── infra/          Docker Compose e init scripts de Postgres
└── docs/           Documentación interna
```

Convenciones detalladas en [CLAUDE.md](./CLAUDE.md).
