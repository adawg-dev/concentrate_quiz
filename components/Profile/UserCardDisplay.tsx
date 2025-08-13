'use client';

import { Avatar, Card, Text } from '@mantine/core';
import classes from './UserCardImage.module.css';

interface UserCardDisplayProps {
  user: any; // Replace with your user type
}

export function UserCardDisplay({ user }: UserCardDisplayProps) {
  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar
        src={user?.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.name || 'User'}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.email || ''}
      </Text>
    </Card>
  );
}