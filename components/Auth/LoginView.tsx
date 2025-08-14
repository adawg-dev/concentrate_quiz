"use client"

import {
  Button,
  Container,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandAzure } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import classes from './LoginView.module.css';

export function LoginView() {
  const handleMicrosoftSignIn = () => {
    signIn('microsoft-entra', { 
      callbackUrl: '/dashboard',
      redirect: false
    })
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Sign on with your Microsoft account to continue
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <Button
          fullWidth
          mt="sm"
          radius="md"
          leftSection={<IconBrandAzure size={18} />}
          onClick={handleMicrosoftSignIn}
        >
          Sign in with Microsoft
        </Button>
      </Paper>
    </Container>
  );
}