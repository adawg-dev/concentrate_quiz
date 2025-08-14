'use client';

import { motion } from 'framer-motion';
import { Avatar, Card, Text } from '@mantine/core';
import classes from './UserCardImage.module.css';

interface UserCardDisplayProps {
  user: any;
}

export function UserCardDisplay({ user }: UserCardDisplayProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <motion.div variants={itemVariants}>
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
            }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Avatar
            src={
              user?.image ||
              'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
            }
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            className={classes.avatar}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {user?.name || 'User'}
          </Text>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Text ta="center" fz="sm" c="dimmed">
            {user?.email || ''}
          </Text>
        </motion.div>
      </Card>
    </motion.div>
  );
}
