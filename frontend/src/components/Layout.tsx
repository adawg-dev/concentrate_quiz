import { ReactNode } from 'react';
import { AppShell, Navbar, Header, Title, Button, Group } from '@mantine/core';
import { useMsal } from '@azure/msal-react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: ReactNode }) {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="md">
            <Link to="/dashboard"><Button variant="subtle" fullWidth>Dashboard</Button></Link>
            <Link to="/profile"><Button variant="subtle" fullWidth>Profile</Button></Link>
          </Navbar.Section>
          <Navbar.Section>
            <Button onClick={handleLogout} color="red" fullWidth>Logout</Button>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Title order={3}>Azure SSO App</Title>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
