import request from 'supertest';
import app from './app';

jest.mock('./db', () => ({
  getUserByEmail: jest.fn(async (email: string) => {
    if (email === 'missing@example.com') {
      return null;
    }
    return { id: 1, email, name: 'Test User' };
  }),
  upsertUserByEmail: jest.fn(async (data: any) => ({ id: 1, data })),
}));

describe('app routes', () => {
  it('GET /api/v0/users/by-email validates email', async () => {
    const res = await request(app).get('/api/v0/users/by-email');
    expect(res.status).toBe(400);
  });

  it('GET /api/v0/users/by-email returns 404 when not found', async () => {
    const res = await request(app)
      .get('/api/v0/users/by-email')
      .query({ email: 'missing@example.com' });
    expect(res.status).toBe(404);
  });

  it('GET /api/v0/users/by-email returns user when found', async () => {
    const res = await request(app)
      .get('/api/v0/users/by-email')
      .query({ email: 'user@example.com' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, email: 'user@example.com', name: 'Test User' });
  });

  it('PUT /api/v0/users validates body', async () => {
    const res = await request(app).put('/api/v0/users').send({});
    expect(res.status).toBe(400);
  });

  it('PUT /api/v0/users upserts user', async () => {
    const res = await request(app)
      .put('/api/v0/users')
      .send({ email: 'user@example.com', name: 'Test User' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ email: 'user@example.com', name: 'Test User' });
  });
});
