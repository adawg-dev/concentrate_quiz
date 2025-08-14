'use client';

import { motion } from 'framer-motion';
import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

interface WelcomeViewProps {
  name: string | null | undefined;
}

export function WelcomeView({ name }: WelcomeViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Title className={classes.title} ta="center" mt={100}>
          Welcome{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            {name || 'User'}
          </Text>
        </Title>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
          This webapp is built with the following tech stack: Next.js, React, TypeScript, Mantine,
          Node.js, Express, and PostgreSQL.
        </Text>
      </motion.div>
    </motion.div>
  );
}
