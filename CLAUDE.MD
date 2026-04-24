# Proyecto: Sistema de reservas para barberías (MVP)

## Objetivo
MVP funcional para que una barbería pequeña gestione turnos, clientes y
envíe confirmaciones por WhatsApp automáticamente. El objetivo es validar
con 2-3 barberías piloto antes de escalar.

## Arquitectura

Monorepo con los siguientes servicios orquestados por Docker Compose:

- **backend/**: API REST en Node.js + Fastify + TypeScript + Prisma.
  Maneja auth, reservas, clientes, pagos manuales.
- **frontend/**: Dashboard web en Next.js 14 (App Router) + TypeScript +
  Tailwind + shadcn/ui. Mobile-first.
- **postgres**: PostgreSQL 16 con extensiones pgcrypto, pg_trgm, btree_gist.
- **n8n**: Orquestador para notificaciones WhatsApp y workflows asíncronos.
- **evolution-api**: Gateway WhatsApp (no oficial, basado en Baileys).

## Principios de diseño

1. El backend es el dueño de la lógica transaccional. n8n SOLO maneja
   flujos asíncronos (notificaciones, futuros recordatorios, reportes).
2. No permitir doble reserva: constraint EXCLUDE USING gist en PostgreSQL
   sobre bookings, no solo validación en aplicación.
3. Montos en enteros (centavos), moneda COP por defecto.
4. Timestamps siempre en UTC en la DB; el frontend convierte a America/Bogota.
5. Multi-tenant-ready: aunque el MVP es para una sola barbería, toda tabla
   de dominio tiene barbershop_id desde el inicio.
6. Seguridad: bcrypt (cost 12), JWT RS256, refresh tokens rotativos en
   cookie HttpOnly, HTTPS obligatorio en prod.

## Stack técnico específico

- Backend: Fastify 4, Prisma 5, Zod, argon2, jose (JWT), pino (logs)
- Frontend: Next.js 14, React 18, TanStack Query, react-hook-form + zod,
  date-fns, shadcn/ui, Recharts
- Testing: Vitest + Supertest (backend), Playwright (e2e)
- Formateo: Prettier + ESLint configurados con Airbnb base
- Convenciones: commits en Conventional Commits, ramas feature/*

## Scope del MVP (NO incluir aún)

- Multi-barbería (una sola instalación = una barbería)
- Pagos online (solo registro manual)
- Recordatorios automáticos (fase 2)
- Reportes automatizados (fase 2)
- App móvil nativa
- Portal de reserva para clientes finales

## Convenciones del repositorio

- Todo en español neutro en UI. Código y comentarios en inglés.
- Nombres de tablas en plural y snake_case.
- Nombres de endpoints REST en kebab-case bajo /api/v1/.
- Variables de entorno en UPPER_SNAKE_CASE, documentadas en .env.example.
- Nunca commitear .env, credenciales, ni archivos de sesión de Evolution.

## Cómo trabajar conmigo (Claude)

- Antes de cualquier cambio grande, propone un plan y espera aprobación.
- Ejecuta migraciones explícitamente; no modifiques datos sin confirmar.
- Al agregar dependencias, justifica la elección.
- Prefiere soluciones simples sobre abstracciones prematuras.