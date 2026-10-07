import { S3Client } from '@aws-sdk/client-s3';

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export const getImagesBucketName = () => required('IMAGES_BUCKET_NAME');

export const getImagesCdnDomain = () =>
  required('IMAGES_CDN_DOMAIN').replace(/^https?:\/\//, '').replace(/\/$/, '');

export const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-central-1',
});
