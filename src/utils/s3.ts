import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getImagesBucketName, getImagesCdnDomain, s3 } from '../config/s3';

export const IMAGE_FOLDERS = [
  'heroes',
  'offer-cards',
  'service-categories',
  'services',
] as const;

export const IMAGE_CONTENT_TYPES = ['image/webp'] as const;

/** Max upload size enforced by the CMS before requesting a presign. */
export const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  'image/webp': 'webp',
};

export const publicImageUrl = (key: string): string =>
  `https://${getImagesCdnDomain()}/${key}`;

export const createPresignedUpload = async (folder: string, contentType: string) => {
  const ext = EXTENSIONS[contentType] || 'webp';
  const key = `${folder}/${randomUUID()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: getImagesBucketName(),
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 300 }, // 5 minutes
  );

  return {
    uploadUrl,
    key,
    imageUrl: publicImageUrl(key),
    maxBytes: MAX_IMAGE_BYTES,
  };
};
