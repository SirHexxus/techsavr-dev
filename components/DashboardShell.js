import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, Stack, Avatar, Button } from '@chakra-ui/react';

import { LogoIcon } from '@/styles/icons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="#FFFFFF"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline>
          <NextLink href="/" passHref>
            <LogoIcon color="#000000" name="logo" boxSize={6} />
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link mr={4}>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>

        <Flex justifyContent="center" alignItems="center">
          {user && (
            <NextLink href="/account" passHref>
              <Link>Account</Link>
            </NextLink>
          )}
          <Avatar size="sm" ml={4} src={user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="100vh">
        <Flex w="100%" maxWidth="800px" ml="auto" mr="auto" direction="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
