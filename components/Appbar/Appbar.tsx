'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IconGauge, IconHome2, IconLogout, IconUser } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Appbar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconUser, label: 'Profile' },
];

export function Appbar() {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveIndex = () => {
    if (pathname === '/dashboard') {
      return 0;
    }
    if (pathname === '/profile') {
      return 1;
    }
    return -1;
  };
  const [active, setActive] = useState(-1);

  useEffect(() => {
    setActive(getActiveIndex());
  }, [pathname]);

  const handleNavigation = (index: number) => {
    setActive(index);
    if (index === 0) {
      router.push('/dashboard');
    }
    if (index === 1) {
      router.push('/profile');
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleNavigation(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
}
