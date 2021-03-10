import { useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';
import Feedback from '@/components/Feedback';

export async function getStaticProps(context) {
  try {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);

    return {
      props: {
        initialFeedback: feedback
      },
      revalidate: 1
    };
  } catch (error) {
    return { error };
  }
}

export async function getStaticPaths() {
  try {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
      params: {
        siteId: site.id.toString()
      }
    }));
    return {
      paths,
      fallback: true
    };
  } catch (error) {
    return { error };
  }
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="comment" my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={inputEl} type="comment" />
          <Button
            type="submit"
            mt={4}
            fontWeight="medium"
            isDisabled={router.isFallback}
          >
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  );
};

export default SiteFeedback;
