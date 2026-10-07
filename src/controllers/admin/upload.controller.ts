import { Request, Response } from 'express';
import { createPresignedUpload } from '../../utils/s3';
import { internalServerError } from '../../utils/helpers';

const presignUpload = async (req: Request, res: Response) => {
  const { folder, contentType } = req.body;

  try {
    const result = await createPresignedUpload(folder, contentType);
    res.status(200).json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('is not set')) {
      return res.status(500).json({
        error: {
          message: 'S3 is not configured. Set IMAGES_BUCKET_NAME, IMAGES_CDN_DOMAIN, and AWS credentials.',
          code: 'S3_NOT_CONFIGURED',
        },
      });
    }
    return internalServerError(res);
  }
};

export { presignUpload };
