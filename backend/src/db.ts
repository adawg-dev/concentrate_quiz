/* eslint-disable no-console */
import { Pool } from 'pg';

const globalForPg = global as unknown as { pgPool?: Pool };

export const pg =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DB || 'dev',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pg;
}

pg.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

pg.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
});

export async function upsertUserByEmail(data: Record<string, any>) {
  console.log('upsertUserByEmail called with data:', data);
  const email = data?.email;
  if (!email) {
    console.warn("no email found");
    return;
  }

  try {
    console.log('Attempting to upsert user with email:', email);

    const res = await pg.query(
      `
      INSERT INTO users (data)
      VALUES ($1::jsonb)
      ON CONFLICT ((data->>'email'))
      DO UPDATE SET data = EXCLUDED.data
      RETURNING id, data
      `,
      [JSON.stringify(data)]
    );
    console.log('Upsert successful, result:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Error upserting user by email:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const res = await pg.query(
    `SELECT id, data FROM users WHERE data->>'email' = $1 LIMIT 1`,
    [email]
  );

  if (res.rows.length === 0) {
    return null;
  }

  const row = res.rows[0];
  return {
    id: row.id,
    ...row.data
  };
}