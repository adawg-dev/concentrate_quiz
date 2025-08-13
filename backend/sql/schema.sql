DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users ((data->>'email'));