import { render, screen, userEvent } from '@/test-utils';
import Logout from './Logout';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('Logout', () => {
  it('calls signOut with callbackUrl on click', async () => {
    const { signOut } = jest.requireMock('next-auth/react') as unknown as {
      signOut: jest.Mock;
    };

    render(<Logout />);
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
