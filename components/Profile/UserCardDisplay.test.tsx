import { render, screen } from '@/test-utils';
import { UserCardDisplay } from './UserCardDisplay';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}));

describe('UserCardDisplay', () => {
  it('renders provided user name and email', () => {
    render(<UserCardDisplay user={{ name: 'Alice', email: 'alice@example.com' }} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('renders fallbacks when user fields missing', () => {
    render(<UserCardDisplay user={{}} />);
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
