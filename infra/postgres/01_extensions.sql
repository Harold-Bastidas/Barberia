-- Extensions required by the app database.
-- Runs connected to POSTGRES_DB (barberia) on first container start.

CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid(), crypt()
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- trigram similarity for fuzzy search
CREATE EXTENSION IF NOT EXISTS btree_gist; -- EXCLUDE USING gist (double-booking constraint)
