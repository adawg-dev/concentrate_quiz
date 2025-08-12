import { Pool } from 'pg';

// Use DATABASE_URL in postgres://user:pass@host:port/db format
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = new Pool({ connectionString });

export type UserRow = {
  id: string; // UUID
  data: any;  // jsonb
};

export async function ensureSchema() {
  await pool.query(`
    create table if not exists users (
      id uuid primary key,
      data jsonb not null
    );
    create index if not exists users_data_gin on users using gin (data);
  `);
}

export async function upsertUser(id: string, data: Record<string, any>) {
  await pool.query(
    `insert into users (id, data)
     values ($1::uuid, $2::jsonb)
     on conflict (id) do update set data = excluded.data`,
    [id, JSON.stringify(data)]
  );
}

export async function getUser(id: string): Promise<UserRow | null> {
  const { rows } = await pool.query('select id, data from users where id = $1::uuid', [id]);
  return rows[0] ?? null;
}
