import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const siteId = req.query.siteId;
    const { feedback } = await getAllFeedback(siteId);

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
