/* eslint-disable no-console */
import { auth } from '@/auth';
import { UserService } from '@/lib/service';
import { UserCardDisplay } from './UserCardDisplay';

export async function UserCardImage() {
  const session = await auth();

  if (!session?.user?.email) {
    console.warn('No user email found in session');
    return null;
  }

  let backendUser = null;
  try {
    backendUser = await UserService.getUserByEmail(session?.user.email);
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return <UserCardDisplay user={backendUser} />;
}
