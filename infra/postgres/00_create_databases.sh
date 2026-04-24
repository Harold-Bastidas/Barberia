#!/bin/bash
# Creates the n8n database if it does not already exist.
# This script runs once on first container start (empty data volume).
# It connects as POSTGRES_USER to POSTGRES_DB (the app database).
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE n8n OWNER "$POSTGRES_USER"'
    WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'n8n'
    )\gexec
EOSQL
