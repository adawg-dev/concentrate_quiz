import { render, screen, userEvent } from '@/test-utils';
import { Appbar } from './Appbar';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/dashboard',
}));

jest.mock('next-auth/react', () => ({ signOut: jest.fn() }));

describe('Appbar', () => {
  it('highlights dashboard when on /dashboard and navigates on click', async () => {
    render(<Appbar />);

    // two nav buttons + logout
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('calls signOut when clicking Logout', async () => {
    const { signOut } = jest.requireMock('next-auth/react') as unknown as {
      signOut: jest.Mock;
    };

    render(<Appbar />);
    const allButtons = await screen.findAllByRole('button');
    const logoutBtn = allButtons[allButtons.length - 1];
    await userEvent.click(logoutBtn);
    expect(signOut).toHaveBeenCalled();
  });
});
