import { render, screen, userEvent } from '@/test-utils';
import { LoginView } from './LoginView';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('LoginView', () => {
  it('calls signIn with microsoft-entra and options on click', async () => {
    const { signIn } = jest.requireMock('next-auth/react') as unknown as {
      signIn: jest.Mock;
    };

    render(<LoginView />);
    const btn = await screen.findByRole('button', { name: /sign in with microsoft/i });
    await userEvent.click(btn);

    expect(signIn).toHaveBeenCalledWith('microsoft-entra', {
      callbackUrl: '/dashboard',
      redirect: false,
    });
  });
});
