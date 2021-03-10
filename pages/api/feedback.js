import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { formatObjectKeys, logger } from '@/utils/logger';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    // console.log(req.headers);
    const { feedback } = await getUserFeedback(uid);
    // console.log(feedback);
    res.status(200).json({ feedback });
  } catch (error) {
    console.error({
      headers: formatObjectKeys(req.headers),
      url: req.url,
      method: req.method,
      statusCode: res.statusCode,
      errorMessage: error.message
    });

    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );
    res.status(500).json({ error });
  }
};
