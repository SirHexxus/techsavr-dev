import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import { GoogleIcon, LogoIcon } from '@/styles/icons';
import { EmailIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';

const SITE_ID = 'ELOuoUlh4xfcfIsmN9M9'; // process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  // const { feedback } = await getAllFeedback(SITE_ID);
  // const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback || []
      // site
    },
    revalidate: 1
  };
}

const Home = ({ allFeedback }) => {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
              }}
            />
          </head>

          <LogoIcon color="logo" name="logo" boxSize={32} />
          <Text mb={4} fontSize="lg" p={6}>
            {/* <Text as="span" fontWeight="bold" display="inline">
              TechSavr
            </Text> */}
            {` is the fastest and easiest way to add comments or reviews to your static site. It's still a work in progress, but you can check it out by logging in.`}
          </Text>

          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              mt={4}
              size="lg"
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
            >
              View Dashboard
            </Button>
          ) : (
            <Stack>
              <Button
                leftIcon={<EmailIcon />}
                mt={4}
                size="lg"
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                onClick={(e) => auth.signinWithEmail()}
              >
                Sign In with Email
              </Button>
              <Button
                leftIcon={<GoogleIcon />}
                mt={4}
                size="lg"
                onClick={(e) => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                _hover={{ bg: 'gray.100' }}
                _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
              >
                Sign In with Google
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            // settings={site?.settings}
            // isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
