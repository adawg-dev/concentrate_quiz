import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const initializeDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        data JSONB
      );
    `);
    console.log('Database initialized');
  } finally {
    client.release();
  }
};

export const findOrCreateUser = async (profile: { oid: string; [key: string]: any }) => {
  const { oid, ...rest } = profile;
  const client = await pool.connect();
  try {
    let res = await client.query('SELECT * FROM users WHERE id = $1', [oid]);
    if (res.rows.length === 0) {
      res = await client.query(
        'INSERT INTO users (id, data) VALUES ($1, $2) RETURNING *',
        [oid, rest]
      );
      console.log('New user created:', res.rows[0]);
    } else {
      // Update user data on every login
      res = await client.query(
          'UPDATE users SET data = $2 WHERE id = $1 RETURNING *',
          [oid, rest]
      );
      console.log('User found and updated:', res.rows[0]);
    }
    return res.rows[0];
  } finally {
    client.release();
  }
};
