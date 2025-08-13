/* eslint-disable no-console */
import { auth } from '@/auth';
import { UserService } from '@/lib/service';
import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export async function Welcome() {
  const session = await auth();

  if (!session?.user?.email) {
    console.warn('No user email found in session');
    return null;
  }

  let backendUser = null;
  try {
    backendUser = await UserService.getUserByEmail(session?.user.email);
    if (backendUser) {
      console.log('Fetched backend user:', backendUser);
    } else {
      console.warn('No backend user found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          {backendUser?.name || 'User'}
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This webapp is built with the following tech stack: Next.js, React, TypeScript, Mantine, Node.js, Express, and PostgreSQL.
      </Text>
    </>
  );
}
