import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { LoginView } from '@/components/Auth/LoginView';

export default function HomePage() {
  return (
    <>
      <LoginView />
      <ColorSchemeToggle />
    </>
  );
}
