import { render, screen, userEvent } from '@/test-utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';

describe('ColorSchemeToggle', () => {
  it('renders three buttons', async () => {
    render(<ColorSchemeToggle />);
    expect(await screen.findByRole('button', { name: /light/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /dark/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /auto/i })).toBeInTheDocument();
  });

  it('invokes setColorScheme via context buttons', async () => {
    render(<ColorSchemeToggle />);
    await userEvent.click(screen.getByRole('button', { name: /light/i }));
    await userEvent.click(screen.getByRole('button', { name: /dark/i }));
    await userEvent.click(screen.getByRole('button', { name: /auto/i }));
  });
});
