import { LoginView } from '@/components/Auth/LoginView';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <LoginView />
      <ColorSchemeToggle />
    </>
  );
}
