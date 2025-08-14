'use client';

import { IconLogout } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { Button } from '@mantine/core';

export function Logout() {
  const handleLogout = () => signOut({ callbackUrl: '/' });

  return (
    <Button
      variant="light"
      color="red"
      leftSection={<IconLogout size={16} />}
      onClick={handleLogout}
    >
      Sign out
    </Button>
  );
}

export default Logout;
