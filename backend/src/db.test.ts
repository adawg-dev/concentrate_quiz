const queryMock = jest.fn();
const onMock = jest.fn();

jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation(() => ({
    query: queryMock,
    on: onMock,
  })),
}));

import { getUserByEmail, upsertUserByEmail } from './db';

describe('db helpers', () => {
  beforeEach(() => {
    queryMock.mockReset();
    onMock.mockReset();
  });

  it('upsertUserByEmail returns early when email missing', async () => {
    const res = await upsertUserByEmail({});
    expect(res).toBeUndefined();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('upsertUserByEmail performs insert/update and returns row', async () => {
    const row = { id: 1, data: { email: 'a@b.com', name: 'A' } };
    queryMock.mockResolvedValueOnce({ rows: [row] });
    const res = await upsertUserByEmail({ email: 'a@b.com', name: 'A' });
    expect(queryMock).toHaveBeenCalled();
    expect(res).toEqual(row);
  });

  it('getUserByEmail returns null when no rows', async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });
    const res = await getUserByEmail('none@example.com');
    expect(res).toBeNull();
  });

  it('getUserByEmail returns combined row', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 2, data: { email: 'a@b.com', name: 'A' } }] });
    const res = await getUserByEmail('a@b.com');
    expect(res).toEqual({ id: 2, email: 'a@b.com', name: 'A' });
  });
});
