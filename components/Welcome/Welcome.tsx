/* eslint-disable no-console */
import { auth } from '@/auth';
import { UserService } from '@/lib/service';
import { WelcomeView } from './WelcomeView';

export async function Welcome() {
  const session = await auth();

  if (!session?.user?.email) {
    console.warn('No user email found in session');
    return <WelcomeView name={null} />;
  }

  let backendUser = null;
  try {
    backendUser = await UserService.getUserByEmail(session.user.email);
    if (backendUser) {
      console.log('Fetched backend user:', backendUser);
    } else {
      console.warn('No backend user found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return <WelcomeView name={backendUser?.name} />;
}
