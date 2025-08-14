import { UserService } from './service';

describe('UserService', () => {
  const originalFetch = global.fetch as any;

  beforeEach(() => {
    (global as any).fetch = jest.fn();
    process.env.BACKEND_URL = 'http://example.com';
  });

  afterEach(() => {
    (global as any).fetch = originalFetch;
    delete process.env.BACKEND_URL;
    jest.restoreAllMocks();
  });

  it('getUserByEmail returns user on 200', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ id: '1', email: 'a@b.com', name: 'A' }),
    });
    const res = await UserService.getUserByEmail('a@b.com');
    expect(res).toEqual({ id: '1', email: 'a@b.com', name: 'A' });
    expect(global.fetch).toHaveBeenCalledWith(
      'http://example.com/api/v0/users/by-email?email=a%40b.com'
    );
  });

  it('getUserByEmail returns null on 404', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    const res = await UserService.getUserByEmail('x@y.com');
    expect(res).toBeNull();
  });

  it('getUserByEmail throws on non-OK', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });
    await expect(UserService.getUserByEmail('x@y.com')).rejects.toThrow(/Failed to fetch user/);
  });

  it('upsertUser returns response json on 200', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ email: 'a@b.com', name: 'A' }),
    });
    const body = { email: 'a@b.com', name: 'A', image: '' } as any;
    const res = await UserService.upsertUser(body);
    expect(res).toEqual({ email: 'a@b.com', name: 'A' });
    expect(global.fetch).toHaveBeenCalledWith(
      'http://example.com/api/v0/users',
      expect.objectContaining({ method: 'PUT' })
    );
  });

  it('upsertUser throws on error status', async () => {
    (global as any).fetch.mockResolvedValueOnce({ ok: false, statusText: 'Bad' });
    await expect(
      UserService.upsertUser({ email: 'e', name: 'n', image: '' } as any)
    ).rejects.toThrow(/Failed to upsert user/);
  });
});
