import { render, screen } from '@/test-utils';
import { Welcome } from './Welcome';

// Mock next-auth to avoid ESM import issues in Jest
jest.mock('next-auth/react', () => ({}));
jest.mock('@/auth', () => ({ auth: jest.fn(async () => ({ user: { email: 'a@b.com' } })) }));
jest.mock('@/lib/service', () => ({
  UserService: { getUserByEmail: jest.fn(async () => ({ name: 'Alice' })) },
}));

describe('Welcome component', () => {
  it('renders WelcomeView with fetched user name', async () => {
    const element = await Welcome();
    render(element as any);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
